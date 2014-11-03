var Autowire = require("wantsit").Autowire

var WebSocketResponder = function() {
  this._config = Autowire;
  this._logger = Autowire;
  this._webSocketServer = Autowire;
  this._hostList = Autowire;

  this._events = [];
}

WebSocketResponder.prototype.afterPropertiesSet = function() {
  var logger = this._logger;

  this._webSocketServer.broadcast = function(data) {
    var message = JSON.stringify(data);

    this.clients.forEach(function(client) {
      try {
        client.send(message);
      } catch(e) {
        logger.warn("WebSocketResponder", "Error broadcasing to client", e.message);
      }
    }.bind(this));
  };
  this._webSocketServer.on("connection", function(client) {
    client.on("message", function(message) {
      var request = JSON.parse(message);

      if(request.method && request.args && this[request.method]) {
        request.args.unshift(client);

        this[request.method].apply(this, request.args);
      }
    }.bind(this));

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
    ]));
  }.bind(this));

  // broadcast error logging
  this._listener.on("log:err", this._broadcastLog.bind(this, "error"));

  // broadcast info logging
  this._listener.on("log:out", this._broadcastLog.bind(this, "info"));

  // broadcast exceptions
  this._listener.on("process:exception", function(event) {
    var data = event.data ? event.data : event.err
    var host, id, message, stack;

    host = event.name

    if(event.process) {
      id = event.process.pm_id;
    }

    message = data.message;
    stack = data.stack;

    if(!id) {
      return
    }

    this._hostList.addLog(host, id, "error", stack);

    this._events.push({
      method: "onProcessException",
      args: [
        host, id, message, stack
      ]
    });
  }.bind(this));

  // broadcast system data updates
  this._listener.on("systemData", function(data) {
    this._events.push({
      method: "onSystemData",
      args: [
        data
      ]
    });
  }.bind(this));

  setInterval(this._processEvents.bind(this), this._config.get("ws:frequency"));
};

WebSocketResponder.prototype._processEvents = function() {
  if(this._events.length == 0) {
    return;
  }

  this._webSocketServer.broadcast(this._events);

  this._events.length = 0;
}

WebSocketResponder.prototype._broadcastLog = function(type, event) {
  var id = event.process.pm_id;
  var log;

  // ugh
  if(event.data) {
    if(event.data.str) {
      log = event.data.str
    } else if(Array.isArray(event.data)) {
      log = new Buffer(event.data).toString('utf8');
    } else {
      log = event.data.toString()
    }
  } else if(event.str) {
    log = event.str;
  }

  if(!log) {
    return;
  }

  if(log.trim) {
    log = log.trim()
  }

  this._hostList.addLog(event.name, id, type, log);

  this._events.push({
    method: "on" + type.substring(0, 1).toUpperCase() + type.substring(1) + "Log",
    args: [
      event.name, id, log
    ]
  });
};

WebSocketResponder.prototype.startProcess = function(client, host, pm_id) {

};

WebSocketResponder.prototype.stopProcess = function(client, host, pm_id) {

};

WebSocketResponder.prototype.restartProcess = function(client, host, pm_id) {

};

WebSocketResponder.prototype.reloadProcess = function(client, host, pm_id) {

};

WebSocketResponder.prototype.debugProcess = function(client, host, pm_id) {

};

module.exports = WebSocketResponder;
