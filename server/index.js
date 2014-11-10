var Container = require('wantsit').Container,
  ObjectFactory = require('wantsit').ObjectFactory,
  path = require('path'),
  fs = require('fs'),
  os = require('os'),
  logger = require('andlog'),
  Hapi = require('hapi'),
  BasicAuth = require('hapi-auth-basic'),
  Columbo = require("columbo"),
  pem = require('pem'),
  async = require('async'),
  http = require('http'),
  bcrypt = require('bcrypt'),
  SocketIO = require('socket.io')

BossWeb = function() {

  // make errors a little more descriptive
  process.on("uncaughtException", function (exception) {
    container.find("logger").error("Uncaught exception", exception && exception.stack ? exception.stack : "No stack trace available")

    throw exception
  }.bind(this))

  // create container
  var container = new Container();

  // parse configuration
  var config = container.createAndRegister("config", require("./components/Configuration"))

  // set up logging
  container.register("logger", logger)

  // object factories
  container.createAndRegister("hostDataFactory", ObjectFactory, require("./domain/HostData"))
  container.createAndRegister("processDataFactory", ObjectFactory, require("./domain/ProcessData"))

  // holds host data
  container.createAndRegister("hostList", require("./components/HostList"));


  var moonbootsConfig = {
    "isDev": true
  }

  var tasks = []

  if(config.https.enabled) {
    if(config.https.key && config.https.certificate) {
      tasks.push(function(callback) {
        logger.info('Reading SSL key and certificate')

        async.parallel([
          fs.readFile.bind(fs, config.https.key, {
            encoding: 'utf8'
          }),
          fs.readFile.bind(fs, config.https.certificate, {
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
    hapi.state('config', {
      ttl: null,
      isSecure: config.https.enabled,
      encoding: 'none'
    })
    hapi.ext('onPreResponse', function(request, reply) {
      if(!request.state.config && !(request.response instanceof Error)) {
        // copy the config
        var clientConfig = JSON.parse(JSON.stringify(config.client))

        // add the auth
        clientConfig.auth = request.auth.credentials

        // encode the cookie
        var cookie = encodeURIComponent(JSON.stringify(clientConfig))

        // set the cookie
        return reply(request.response.state('config', cookie))
      } else {
        return reply()
      }
    })
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
    hapi.pack.register({plugin: require('moonboots_hapi'), options: require('./moonboots')(moonbootsConfig)}, function (err) {
      if (err) throw err

      hapi.start(function (err) {
        if (err) throw err
        console.log("boss-web is running at: http://localhost:%d", hapi.info.port)

        // web sockets
        container.register('webSocket', SocketIO.listen(hapi.listener))
        container.createAndRegister("webSocketResponder", require("./components/WebSocketResponder"))
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
