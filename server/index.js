var Container = require('wantsit').Container,
  ObjectFactory = require('wantsit').ObjectFactory,
  path = require('path'),
  WebSocketServer = require('ws').Server,
  EventEmitter = require('wildemitter'),
  util = require('util'),
  fs = require('fs'),
  clientConfig = coerce(stripUnderscores(require('rc')('boss/bossweb-client', path.resolve(__dirname + '/../bossweb-client')))),
  logger = require('andlog'),
  Hapi = require('hapi'),
  Columbo = require("columbo"),
  hostConfig = coerce(checkLength(stripUnderscores(require('rc')('boss/bossweb-hosts')), 'Please define some host names')),
  userConfig = coerce(checkLength(stripUnderscores(require('rc')('boss/bossweb-users')), 'Please define some users')),
  config = coerce(stripUnderscores(require('rc')('boss/bossweb', path.resolve(__dirname + '/../bossweb'))))

function coerce(obj) {
  if(Array.isArray(obj)) {
    return obj.map(function(value) {
      return coerce(value)
    })
  }

  if(obj instanceof String || typeof obj == 'string') {
    if(obj == 'false') {
      return false
    }

    if(obj == 'true') {
      return true
    }

    if(isFinite(obj)) {
      return parseFloat(obj)
    }

    return obj
  }

  if(obj === true || obj === false) {
    return obj
  }

  for(var key in obj) {
    obj[key] = coerce(obj[key])
  }

  return obj
}

function stripUnderscores(obj) {
  for(var key in obj) {
    if(key == '_') {
      delete obj[key]
    }
  }

  return obj
}

function checkLength(obj, message) {
  if(Object.keys(obj).length == 0) {
    console.error(message)
    process.exit(1)
  }

  return obj
}

Object.keys(userConfig).forEach(function(userName) {
  for(var key in userConfig[userName]) {
    if(key == 'password') {
      continue
    }

    if(!hostConfig[key]) {
      console.error('User \'%s\' has config set for host \'%s\' but no such host exists in bossweb-hosts - please fix your configuration', userName, key)
      process.exit(1)
    }
  }
})

config.hosts = hostConfig
config.users = userConfig

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
    clientConfig: JSON.stringify(clientConfig.client),

    // set clientconfig cookie
    configStateConfig: {
      encoding: 'none',
      ttl: 1000 * 60 * 15,
      isSecure: clientConfig.isSecure
    }
  }

  var server = Hapi.createServer(config.http.listen, config.http.port)

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
      console.log("boss-web is running at: http://localhost:%d", config.http.port)
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
  server.route({
    method: 'GET',
    path: '/apple-touch-icon.png',
    handler: function (request, reply) {
      reply.file(path.resolve(__dirname + '/../public/apple-touch-icon.png'))
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
