var _ = require('underscore'),
  config = require('clientconfig'),
  Router = require('./router'),
  MainView = require('./views/main'),
  Hosts = require('./models/hosts'),
  domReady = require('domready'),
  NoHostsPage = require('./pages/nohosts'),
  User = require('./models/user')

module.exports = {
  // this is the the whole app initialiser
  blastoff: function () {
    var self = window.app = this

    // create an empty collection for our host models
    this.hosts = new Hosts()
    this.hosts.on('add', function(host) {
      host.processes.fetch()

      setInterval(host.processes.fetch.bind(host.processes), config.frequency)
    })

    window.app.socket = require('./helpers/socket')

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

      app.user = new User()
      app.user.name = config.auth.user

      // init our main view
      var main = self.view = new MainView({
        el: document.body,
        model: app.user
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
