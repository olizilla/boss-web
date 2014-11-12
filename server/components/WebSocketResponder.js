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
  }.bind(this))

/*
    // send config and all host data
    client.send(JSON.stringify([{
      method: "onConfig",
      args: [{
        graph: this._config.get("graph"),
        logs: this._config.get("logs"),
        updateFrequency: this._config.get("updateFrequency"),
        requiredPm2Version: this._config.get("requiredPm2Version")
      }]
    }, {
      method: "onHosts",
      args: [
        this._hostList.getHosts()
      ]
    }
    ]))
*/
/*
  // broadcast error logging
  this._listener.on("log:err", this._broadcastLog.bind(this, "error"))

  // broadcast info logging
  this._listener.on("log:out", this._broadcastLog.bind(this, "info"))

  // broadcast exceptions
  this._listener.on("process:exception", function(event) {
    var data = event.data ? event.data : event.err
    var host, id, message, stack

    host = event.name

    if(event.process) {
      id = event.process.pm_id
    }

    message = data.message
    stack = data.stack

    if(!id) {
      return
    }

    this._hostList.addLog(host, id, "error", stack)

    this._events.push({
      method: "onProcessException",
      args: [
        host, id, message, stack
      ]
    })
  }.bind(this))

  // broadcast system data updates
  this._listener.on("systemData", function(data) {
    this._events.push({
      method: "onSystemData",
      args: [
        data
      ]
    })
  }.bind(this))
 */

  setInterval(this._processEvents.bind(this), this._config.ws.frequency)
}

WebSocketResponder.prototype._processEvents = function() {
  if(this._events.length == 0) {
    return
  }

  this._webSocketServer.broadcast(this._events)

  this._events.length = 0
}

WebSocketResponder.prototype._broadcastLog = function(type, event) {
  var id = event.process.pm_id
  var log

  // ugh
  if(event.data) {
    if(event.data.str) {
      log = event.data.str
    } else if(Array.isArray(event.data)) {
      log = new Buffer(event.data).toString('utf8')
    } else {
      log = event.data.toString()
    }
  } else if(event.str) {
    log = event.str
  }

  if(!log) {
    return
  }

  if(log.trim) {
    log = log.trim()
  }

  this._hostList.addLog(event.name, id, type, log)

  this._events.push({
    method: "on" + type.substring(0, 1).toUpperCase() + type.substring(1) + "Log",
    args: [
      event.name, id, log
    ]
  })
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

module.exports = WebSocketResponder
