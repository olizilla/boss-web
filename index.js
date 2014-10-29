var Hapi = require('hapi'),
  config = require('getconfig')

var internals = {
  clientConfig: JSON.stringify(config.client),

  // set clientconfig cookie
  configStateConfig: {
    encoding: 'none',
    ttl: 1000 * 60 * 15,
    isSecure: config.isSecure
  }
}

var server = new Hapi.Server(config.server.http.listen, config.server.http.port)

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
server.pack.register({plugin: require('moonboots_hapi'), options: require('./moonbootsConfig')}, function (err) {
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
      path: 'public/images'
    }
  }
})
