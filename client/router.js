var Router = require('ampersand-router'),
  HostPage = require('./pages/host'),
  ConnectingPage = require('./pages/connecting'),
  IncompatiblePage = require('./pages/incompatible'),
  ErrorPage = require('./pages/error'),
  hosts = require('./models/hosts')

module.exports = Router.extend({
  routes: {
    'host/:host': 'host',
    '': 'catchAll',
    '(*path)': 'catchAll'
  },

  host: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    host.on('change:status', this._chooseHostPage.bind(this, host))
    this._chooseHostPage(host)
  },

  _chooseHostPage: function(host) {
    if(host.status == 'connected') {
      this.trigger('page', new HostPage({
        model: host
      }))
    } else if(host.status == 'connecting') {
      this.trigger('page', new ConnectingPage({
        model: host
      }))
    } else if(host.status == 'incompatible') {
      this.trigger('page', new IncompatiblePage({
        model: host
      }))
    } else {
      this.trigger('page', new ErrorPage({
        model: host
      }))
    }
  },

  catchAll: function () {
    this.redirectTo('/host/' + window.app.hosts.at(0).name)
  }
})
