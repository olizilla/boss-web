var Router = require('ampersand-router'),
  HostPage = require('./pages/host'),
  ProcessesPage = require('./pages/processes'),
  ConnectingPage = require('./pages/connecting'),
  IncompatiblePage = require('./pages/incompatible'),
  TimeoutPage = require('./pages/timeout'),
  NoHostsPage = require('./pages/nohosts'),
  LoadingHostsPage = require('./pages/loadinghosts')
  ErrorPage = require('./pages/error'),
  ProcessPage = require('./pages/process')

module.exports = Router.extend({
  routes: {
    'host/:host': 'host',
    'host/:host/system': 'system',
    'host/:host/processes': 'processes',
    'host/:host/process/:process': 'process',
    '': 'catchAll',
    '(*path)': 'catchAll'
  },

  host: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    return this.redirectTo('/host/' + hostName + '/system')
  },

  system: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    host.on('change:status', this._chooseHostPage.bind(this, host, HostPage))
    this._chooseHostPage(host, HostPage)
  },

  processes: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    host.on('change:status', this._chooseHostPage.bind(this, host, ProcessesPage))
    this._chooseHostPage(host, ProcessesPage)
  },

  process: function(hostName, processId) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    var process = host.processes.get(processId)

    if(!process) {
      return this.redirectTo('/')
    }

    this.trigger('page', new ProcessPage({
      model: process
    }))
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
    } else if(host.status == 'timeout') {
      this.trigger('page', new TimeoutPage({
        model: host
      }))
    } else {
      this.trigger('page', new ErrorPage({
        model: host
      }))
    }
  },

  catchAll: function () {
    if(window.loadingHostList) {
      return this.trigger('page', new LoadingHostsPage())
    } else if(window.app.hosts.models.length == 0) {
      return this.trigger('page', new NoHostsPage())
    }

    this.redirectTo('/host/' + window.app.hosts.at(0).name)
  }
})
