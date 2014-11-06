var Container = require('wantsit').Container,
  ObjectFactory = require('wantsit').ObjectFactory,
  path = require('path'),
  WebSocketServer = require('ws').Server,
  EventEmitter = require('wildemitter'),
  util = require('util'),
  fs = require('fs'),
  os = require('os'),
  logger = require('andlog'),
  Hapi = require('hapi'),
  HapiSession = require('hapi-session'),
  BasicAuth = require('hapi-auth-basic'),
  Columbo = require("columbo"),
  config = require('./config'),
  pem = require('pem'),
  async = require('async'),
  http = require('http'),
  bcrypt = require('bcrypt')

BossWeb = function() {

  // make errors a little more descriptive
  process.on("uncaughtException", function (exception) {
    container.find("logger").error("Uncaught exception", exception && exception.stack ? exception.stack : "No stack trace available")

    throw exception
  }.bind(this))

  // create container
  var container = new Container();

  // parse configuration
  container.register("config", config)

  // set up logging
  container.register("logger", logger)

  // web sockets
//  container.createAndRegister("webSocketResponder", require("./components/WebSocketResponder"));
//  container.createAndRegister("webSocketServer", WebSocketServer, {
//    server: this._server,
//    path: "/ws"
//  });

  // object factories
  container.createAndRegister("hostDataFactory", ObjectFactory, require("./domain/HostData"))
  container.createAndRegister("processDataFactory", ObjectFactory, require("./domain/ProcessData"))

  // holds host data
  container.createAndRegister("hostList", require("./components/HostList"));

  var tasks = []

  if(config.https.enabled) {
    if(config.https.key && config.https.cert) {
      tasks.push(function(callback) {
        logger.info('Reading SSL key and certificate')

        async.parallel([
          fs.readFile.bind(fs, config.https.key, {
            encoding: 'utf8'
          }),
          fs.readFile.bind(fs, config.https.cert, {
            encoding: 'utf8'
          })
        ], function(error, result) {
          callback(error, {
            serviceKey: result[0],
            certificate: result[1],
            passphrase: config.https.passphrase
          })
        })
      })
    } else {
      tasks.push(function(callback) {
        logger.info('Generating SSL key and certificate')
        pem.createCertificate({days:1, selfSigned:true}, callback)
      })
    }
  } else {
    logger.info('HTTPS is disabled')
  }

  async.series(tasks, function(error, result) {
    if(error) throw error

    var internals = {
      clientConfig: JSON.stringify(config.client.client),

      // set clientconfig cookie
      configStateConfig: {
        encoding: 'none',
        ttl: 1000 * 60 * 15,
        isSecure: config.https.enabled
      }
    }

    var options = {}
    var host = config.http.listen
    var port = config.http.port

    if(config.https.enabled) {
      options.tls = {
        key: result[0].serviceKey,
        cert: result[0].certificate,
        passphrase: result[0].passphrase,
        ciphers: 'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
        honorCipherOrder: true
      }

      host = config.https.listen
      port = config.https.port
    }

    if(config.https.upgrade) {
      logger.info('Starting HTTP -> HTTPS upgrade server')

      process.nextTick(function() {
        http.createServer(function(request, response) {
          var host = request.headers.host

          if(!host) {
            host = os.hostname()
          } else {
            host = host.split(':')[0]
          }

          // create an app that will redirect all requests to the https version
          var httpsUrl = "https://" + host

          if(config.https.port != 443) {
            httpsUrl += ":" + config.https.port;
          }

          if(request.url) {
            httpsUrl += request.url
          }

          response.setHeader('location', httpsUrl)
          response.statusCode = 302
          response.end()
        }).listen(config.http.port, config.http.host, function() {
          logger.info('HTTP -> HTTPS upgrade server listening on port', config.http.port);
        })
      })
    }

    var hapi = Hapi.createServer(host, port, options)

    hapi.state('config', internals.configStateConfig)

    hapi.ext('onPreResponse', function(request, reply) {
      if (!request.state.config) {
        return reply(request.response.state('config', encodeURIComponent(internals.clientConfig)))
      }
      else {
        return reply()
      }
    })
    /*hapi.auth('session', {
      implementation: new HapiSession(hapi, {

      })
    })*/
    hapi.pack.register(BasicAuth, function (error) {
      hapi.auth.strategy('simple', 'basic', true, {
        validateFunc: function (userName, password, callback) {
          var user = config.users[userName]

          if (!user) {
            return callback(null, false)
          }

          bcrypt.compare(password, user.password, function (error, isValid) {
            callback(error, isValid, {
              user: userName
            })
          })
        }
      })
    })
    hapi.pack.register({plugin: require('moonboots_hapi'), options: require('./moonboots')}, function (err) {
      if (err) throw err

      hapi.start(function (err) {
        if (err) throw err
        console.log("boss-web is running at: http://localhost:%d", hapi.info.port)
      })
    })

    hapi.route({
      method: 'GET',
      path: '/images/{param*}',
      handler: {
        directory: {
          path: path.resolve(__dirname + '/../public/images')
        }
      }
    })
    hapi.route({
      method: 'GET',
      path: '/fonts/{param*}',
      handler: {
        directory: {
          path: path.resolve(__dirname + '/../public/fonts')
        }
      }
    })
    hapi.route({
      method: 'GET',
      path: '/apple-touch-icon.png',
      config: {
        auth: false
      },
      handler: function (request, reply) {
        reply.file(path.resolve(__dirname + '/../public/apple-touch-icon.png'))
      }
    })

    var columbo = new Columbo({
      resourceDirectory: path.resolve(__dirname + '/resources'),
      resourceCreator: function(resource, name) {
        return container.createAndRegister(name, resource)
      },
      logger: logger
    })

    hapi.route(columbo.discover())
    hapi.start()
  })
}

module.exports = BossWeb
