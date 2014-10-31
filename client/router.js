var Router = require('ampersand-router'),
  SystemPage = require('./pages/system'),
  ProcessesPage = require('./pages/processes'),
  ConnectingPage = require('./pages/connecting'),
  IncompatiblePage = require('./pages/incompatible'),
  ErrorPage = require('./pages/error'),
  hosts = require('./models/hosts')

module.exports = Router.extend({
  routes: {
    'host/:host': 'host',
    'host/:host/system': 'system',
    'host/:host/processes': 'processes',
    '': 'catchAll',
    '(*path)': 'catchAll'
  },

  host: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    return this.redirectTo('/' + hostName + '/system')

    host.on('change:status', this._chooseHostPage.bind(this, host))
    this._chooseHostPage(host)
  },

  system: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    host.on('change:status', this._chooseHostPage.bind(this, host, SystemPage))
    this._chooseHostPage(host, SystemPage)
  },

  processes: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    host.on('change:status', this._chooseHostPage.bind(this, host, ProcessesPage))
    this._chooseHostPage(host, ProcessesPage)
  },

  _chooseHostPage: function(host, ok) {
    if(host.status == 'connected') {
      this.trigger('page', new ok({
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
