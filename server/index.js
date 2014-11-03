var Container = require('wantsit').Container,
  ObjectFactory = require('wantsit').ObjectFactory,
  path = require('path'),
  WebSocketServer = require('ws').Server,
  EventEmitter = require('wildemitter'),
  util = require('util'),
  fs = require('fs'),
  config = require('getconfig'),
  logger = require('andlog'),
  Hapi = require('hapi'),
  Columbo = require("columbo")

BossWeb = function() {

  // create container
  this._container = new Container();

  // set up logging
  this._container.register("logger", logger)

  // parse configuration
  this._container.register("config", config);

  // web sockets
//  this._container.createAndRegister("webSocketResponder", require("./components/WebSocketResponder"));
//  this._container.createAndRegister("webSocketServer", WebSocketServer, {
//    server: this._server,
//    path: "/ws"
//  });

  // object factories
  this._container.createAndRegister("hostDataFactory", ObjectFactory, require("./domain/HostData"))
  this._container.createAndRegister("processDataFactory", ObjectFactory, require("./domain/ProcessData"))

  // holds host data
  this._container.createAndRegister("hostList", require("./components/HostList"));

  // make errors a little more descriptive
  process.on("uncaughtException", function (exception) {
    this._container.find("logger").error("Uncaught exception", exception && exception.stack ? exception.stack : "No stack trace available")

    throw exception
  }.bind(this));


  var internals = {
    clientConfig: JSON.stringify(config.client),

    // set clientconfig cookie
    configStateConfig: {
      encoding: 'none',
      ttl: 1000 * 60 * 15,
      isSecure: config.isSecure
    }
  }

  var server = Hapi.createServer(config.server.http.listen, config.server.http.port)

  server.state('config', internals.configStateConfig)

  server.ext('onPreResponse', function(request, reply) {
    if (!request.state.config) {
      return reply(request.response.state('config', encodeURIComponent(internals.clientConfig)))
    }
    else {
      return reply()
    }
  })

  // require moonboots_hapi plugin
  server.pack.register({plugin: require('moonboots_hapi'), options: require('./moonboots')}, function (err) {
    if (err) throw err

    server.start(function (err) {
      if (err) throw err
      console.log("boss-web is running at: http://localhost:%d", config.server.http.port)
    })
  })

  server.route({
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname + '/../public/images')
      }
    }
  })
  server.route({
    method: 'GET',
    path: '/fonts/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname + '/../public/fonts')
      }
    }
  })

  var columbo = new Columbo({
    resourceDirectory: path.resolve(__dirname + '/resources'),
    resourceCreator: function(resource, name) {
      return this._container.createAndRegister(name, resource)
    }.bind(this),
    logger: logger
  })

  server.route(columbo.discover())
  server.start()
}

module.exports = BossWeb;
