var _ = require('underscore'),
  logger = require('andlog'),
  config = require('clientconfig'),
  Router = require('./router'),
  MainView = require('./views/main'),
  Hosts = require('./models/hosts'),
  domReady = require('domready')

module.exports = {
  // this is the the whole app initialiser
  blastoff: function () {
    var self = window.app = this

    // create an empty collection for our host models
    this.hosts = new Hosts()
    this.hosts.on('add', function() {
      //
    })
    this.hosts.on('remove', function(host, list, response) {
      //
    })
    this.hosts.on('change', function() {
      //
    })

    // load hosts from config
    //config.hosts.forEach(this.hosts.add.bind(this.hosts))

    // init our URL handlers and the history tracker
    this.router = new Router()

    // wait for document ready to render our main view
    // this ensures the document has a body, etc
    domReady(function () {
      var firstCall = true

      var update = function() {
        self.hosts.fetch({
          merge: true,
          success: function() {
            if(firstCall) {
              firstCall = false

              if(self.hosts.models.length > 0) {
                self.router.redirectTo('/host/' + self.hosts.models[0].name)
              }
            }
          }
        })
      }
      update()
      setInterval(update, config.frequency)

      // init our main view
      var main = self.view = new MainView({
        el: document.body
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
