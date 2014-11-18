var Autowire = require("wantsit").Autowire,
  bcrypt = require('bcrypt'),
  remote = require('boss-remote')

var WebSocketResponder = function() {
  this._config = Autowire
  this._logger = Autowire
  this._hostList = Autowire
  this._webSocket = Autowire

  this._events = []
}

WebSocketResponder.prototype.afterPropertiesSet = function() {
  this._webSocket.use(function(socket, next) {
    if(this._config.https.enabled && !socket.handshake.secure) {
      return next(new Error('Non-SSL connection'))
    }

    if(!socket.handshake.headers.authorization) {
      return next(new Error('No authorisation attempted'))
    }

    var parts = socket.handshake.headers.authorization.split(/\s+/)

    if(parts[0].toLowerCase() !== 'basic') {
      return next(new Error('Invalid authentication type'))
    }

    if(parts.length !== 2) {
      return next(new Error('Invalid authentication format'))
    }

    var credentialsPart = new Buffer(parts[1], 'base64').toString()
    var sep = credentialsPart.indexOf(':')

    if(sep === -1) {
      return next(new Error('Invalid header internal syntax'))
    }

    var username = credentialsPart.slice(0, sep).trim();
    var password = credentialsPart.slice(sep + 1).trim();

    if(!username) {
      return next(new Error('HTTP authentication header missing username'))
    }

    if(!password) {
      return next(new Error('HTTP authentication header missing password'))
    }

    var user = this._config.users[username]

    if(!user) {
      return next(new Error('Authentication failed'))
    }

    bcrypt.compare(password, user.password, function(error, isValid) {
      if(isValid) {
        socket.user = {
          name: username,
          hosts: Object.keys(user).filter(function(key) {
            return key != 'password'
          })
        }

        return next()
      }

      return next(new Error('Authentication failed'))
    })
  }.bind(this))

  this._webSocket.on("connection", function(client) {
    if(!client.user) {
      return client.conn.close()
    }

    client.on('process:stop', this._checkHost.bind(this, this.stopProcess.bind(this), client))
    client.on('process:start', this._checkHost.bind(this, this.startProcess.bind(this), client))
    client.on('process:restart', this._checkHost.bind(this, this.restartProcess.bind(this), client))
    client.on('process:debug', this._checkHost.bind(this, this.debugProcess.bind(this), client))
    client.on('process:gc', this._checkHost.bind(this, this.gcProcess.bind(this), client))
    client.on('process:heapdump', this._checkHost.bind(this, this.heapdumpProcess.bind(this), client))
    client.on('cluster:addworker', this._checkHost.bind(this, this.addClusterWorker.bind(this), client))
    client.on('cluster:removeworker', this._checkHost.bind(this, this.removeClusterWorker.bind(this), client))
  }.bind(this))

  setInterval(this._processEvents.bind(this), this._config.ws.frequency)
}

WebSocketResponder.prototype._processEvents = function() {
  if(this._events.length == 0) {
    return
  }

  this._events.forEach(function(event) {
    this._webSocket.emit.apply(this._webSocket, event)
  }.bind(this))

  this._events.length = 0
}

WebSocketResponder.prototype.broadcast = function() {
  this._events.push(Array.prototype.slice.call(arguments))
}

WebSocketResponder.prototype._checkHost = function(callback, client, hostName) {
  if(client.user.hosts.indexOf(hostName) == -1) {
    // this user has no access to this host
    return
  }

  var args = Array.prototype.slice.call(arguments, 1)
  callback.apply(this, args)
}

WebSocketResponder.prototype._checkHost = function(callback, client, hostName, processId) {
  var host = this._hostList.getHostByName(hostName)

  if(!host || !this._config.hosts[hostName]) {
    return
  }

  if(!client || !client.user || !client.user.name) {
    return
  }

  if(!this._config.users[client.user.name][hostName] || !this._config.users[client.user.name][hostName].secret) {
    return
  }

  remote(this._logger, {
    host: this._config.hosts[hostName].host,
    port:  this._config.hosts[hostName].port,
    user: client.user.name,
    secret: this._config.users[client.user.name][hostName].secret
  }, function(error, boss) {
    if(error) {
      return boss.disconnect()
    }

    callback(undefined, client, hostName, processId, boss, function() {
      boss.disconnect()
    })
  })
}

WebSocketResponder.prototype.startProcess = function(client, host, id) {
  this._logger.info('starting process', arguments)
}

WebSocketResponder.prototype.stopProcess = function(error, client, hostName, processId, boss, callback) {
  client.emit('ws:stop:started', hostName, processId)

  boss.connectToProcess(processId, function(error, remoteProcess) {
    if(error) {
      if(error.code == 'TIMEOUT') {
        client.emit('ws:stop:timeout', hostName, processId, error.message)
      }

      return callback(error)
    }

    remoteProcess.kill(function(error) {
      if(error) {
        client.emit('ws:stop:error', hostName, processId, error.message)
      } else {
        client.emit('ws:stop:finished', hostName, processId)
      }

      callback()
    })
  })
}

WebSocketResponder.prototype.restartProcess = function(error, client, hostName, processId, boss, callback) {
  client.emit('ws:restart:started', hostName, processId)

  boss.connectToProcess(processId, function(error, remoteProcess) {
    if(error) {
      if(error.code == 'TIMEOUT') {
        client.emit('ws:restart:timeout', hostName, processId, error.message)
      }

      return callback(error)
    }

    remoteProcess.restart(function(error) {
      if(error) {
        client.emit('ws:restart:error', hostName, processId, error.message)
      } else {
        client.emit('ws:restart:finished', hostName, processId)
      }

      callback()
    })
  })
}

WebSocketResponder.prototype.debugProcess = function(client, host, id) {
  this._logger.info('debugging process', arguments)
}

WebSocketResponder.prototype.gcProcess = function(error, client, hostName, processId, boss, callback) {
  client.emit('ws:gc:started', hostName, processId)

  boss.connectToProcess(processId, function(error, remoteProcess) {
    if(error) {
      if(error.code == 'TIMEOUT') {
        client.emit('ws:gc:timeout', hostName, processId, error.message)
      }

      return callback(error)
    }

    remoteProcess.forceGc(function(error) {
      if(error) {
        client.emit('ws:gc:error', hostName, processId, error.message)
      } else {
        client.emit('ws:gc:finished', hostName, processId)
      }

      callback()
    })
  })
}

WebSocketResponder.prototype.heapdumpProcess = function(error, client, hostName, processId, boss, callback) {
  client.emit('ws:heap:started', hostName, processId)

  boss.connectToProcess(processId, function(error, remoteProcess) {
    if(error) {
      if(error.code == 'TIMEOUT') {
        client.emit('ws:heap:timeout', hostName, processId, error.message)
      }

      return callback(error)
    }

    remoteProcess.dumpHeap(function(error, path) {
      if(error) {
        client.emit('ws:heap:error', hostName, processId, error.message)
      } else {
        client.emit('ws:heap:finished', hostName, processId, path)
      }

      callback()
    })
  })
}

WebSocketResponder.prototype.addClusterWorker = function(error, client, hostName, processId, boss, callback) {
  client.emit('ws:addworker:started', hostName, processId)

  boss.findProcessInfoById(processId, function(error, processInfo) {
    boss.connectToProcess(processId, function(error, remoteProcess) {
      if(error) {
        if(error.code == 'TIMEOUT') {
          client.emit('ws:addworker:timeout', hostName, processId, error.message)
        }

        return callback(error)
      }

      remoteProcess.setClusterWorkers(processInfo.instances + 1, function(error, path) {
        if(error) {
          if(error.code == 'TIMEOUT') {
            client.emit('ws:addworker:timeout', hostName, processId, error.message)
          } else {
            client.emit('ws:addworker:error', hostName, processId, error.message)
          }
        } else {
          client.emit('ws:addworker:finished', hostName, processId, path)
        }

        callback()
      })
    })
  })
}

WebSocketResponder.prototype.removeClusterWorker = function(error, client, hostName, processId, boss, callback) {
  client.emit('ws:removeworker:started', hostName, processId)

  boss.findProcessInfoById(processId, function(error, processInfo) {
    boss.connectToProcess(processId, function(error, remoteProcess) {
      if(error) {
        if(error.code == 'TIMEOUT') {
          client.emit('ws:removeworker:timeout', hostName, processId, error.message)
        }

        return callback(error)
      }

      if(processInfo.instances == 0) {
        client.emit('ws:removeworker:timeout', hostName, processId, 'There are already no cluster workers')

        return callback()
      }

      remoteProcess.setClusterWorkers(processInfo.instances - 1, function(error, path) {
        if(error) {
          if(error.code == 'TIMEOUT') {
            client.emit('ws:removeworker:timeout', hostName, processId, error.message)
          } else {
            client.emit('ws:removeworker:error', hostName, processId, error.message)
          }
        } else {
          client.emit('ws:removeworker:finished', hostName, processId, path)
        }

        callback()
      })
    })
  })
}

module.exports = WebSocketResponder
