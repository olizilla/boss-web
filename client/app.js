var _ = require('underscore'),
  logger = require('andlog'),
  config = require('clientconfig'),
  Router = require('./router'),
  MainView = require('./views/main'),
  Hosts = require('./models/hosts'),
  domReady = require('domready'),
  NoHostsPage = require('./pages/nohosts'),
  SocketIO = require('socket.io-client'),
  User = require('./models/user')

module.exports = {
  // this is the the whole app initialiser
  blastoff: function () {
    var self = window.app = this

    this.socket = SocketIO('//');
    this.socket.on('connect', function() {
      console.info('connect')
    })
    this.socket.on('connect_error', function(error) {
      console.info('connect_error', error)
    })
    this.socket.on('connect_timeout', function() {
      console.info('connect_timeout')
    })
    this.socket.on('reconnect_attempt', function() {
      console.info('reconnect_attempt')
    })
    this.socket.on('reconnecting', function(count) {
      console.info('reconnecting', count)
    })
    this.socket.on('reconnect_error', function(error) {
      console.info('reconnect_error', error)
    })
    this.socket.on('reconnect_failed', function() {
      console.info('reconnect_failed')
    })
    this.socket.on('reconnect', function(count) {
      console.info('reconnect', count)
    })
    this.socket.on('disconnect', function() {
      console.info('disconnect')
    })
    this.socket.on('event', function() {
      console.info('event', arguments)
    })

    // create an empty collection for our host models
    this.hosts = new Hosts()
    this.hosts.on('add', function(host) {
      host.processes.fetch()

      setInterval(host.processes.fetch.bind(host.processes), config.frequency)
    })

    // init our URL handlers and the history tracker
    this.router = new Router()

    // wait for document ready to render our main view
    // this ensures the document has a body, etc
    domReady(function () {
      window.loadingHostList = true

      var update = function() {
        self.hosts.fetch({
          merge: true,
          success: function() {
            if(window.loadingHostList) {
              delete window.loadingHostList

              if(self.hosts.models.length > 0) {
                self.router.redirectTo('/host/' + self.hosts.models[0].name)
              } else {
                self.router.trigger('page', new NoHostsPage())
              }
            }
          }
        })
      }
      update()
      setInterval(update, config.frequency)

      var user = new User()
      //user.name = config.auth.name
      user.name = 'Alex'

      // init our main view
      var main = self.view = new MainView({
        el: document.body,
        model: user
      })

      // ...and render it
      main.render()

      // we have what we need, we can now start our router and show the appropriate page
      self.router.history.start({pushState: true, root: '/'})
    })
  },

  // This is how you navigate around the app.
  // this gets called by a global click handler that handles
  // all the <a> tags in the app.
  // it expects a url without a leading slash.
  // for example: "costello/settings".
  navigate: function(page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page
    this.router.history.navigate(url, {trigger: true})
  }
}

// run it
module.exports.blastoff();
