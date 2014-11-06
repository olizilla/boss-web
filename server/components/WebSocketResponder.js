var Autowire = require("wantsit").Autowire,
  bcrypt = require('bcrypt')

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
        socket.user = user

        return next()
      }

      return next(new Error('Authentication failed'))
    })
  }.bind(this))

  this._webSocket.on("connection", function(client) {
    if(!client.user) {
      return client.conn.close()
    }

    client.on('process:stop', this.stopProcess.bind(this))
    client.on('process:start', this.startProcess.bind(this))
    client.on('process:restart', this.restartProcess.bind(this))
    client.on('process:debug', this.debugProcess.bind(this))
    client.on('process:gc', this.gcProcess.bind(this))
    client.on('process:heapdump', this.heapdumpProcess.bind(this))
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

WebSocketResponder.prototype.startProcess = function(client, host, id) {
  this._logger.info('starting process', arguments)
}

WebSocketResponder.prototype.stopProcess = function(client, host, id) {
  this._logger.info('stopping process', arguments)
}

WebSocketResponder.prototype.restartProcess = function(client, host, id) {
  this._logger.info('restarting process', arguments)
}

WebSocketResponder.prototype.debugProcess = function(client, host, id) {
  this._logger.info('debugging process', arguments)
}

WebSocketResponder.prototype.gcProcess = function(client, host, id) {
  this._logger.info('gc process', arguments)
}

WebSocketResponder.prototype.heapdumpProcess = function(client, host, id) {
  this._logger.info('heapdump process', arguments)
}

module.exports = WebSocketResponder
