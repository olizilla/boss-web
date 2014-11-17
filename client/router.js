var Router = require('ampersand-router'),
  HostOverviewPage = require('./pages/host/overview'),
  ProcessesPage = require('./pages/host/processes'),
  ProcessOverviewPage = require('./pages/process/overview'),
  ProcessLogsPage = require('./pages/process/logs'),
  ProcessExceptionsPage = require('./pages/process/exceptions'),
  NoHostsPage = require('./pages/nohosts'),
  LoadingHostsPage = require('./pages/loadinghosts')

module.exports = Router.extend({
  routes: {
    'host/:host': 'host',
    'host/:host/processes': 'hostProcessList',
    'host/:host/process/:process': 'process',
    'host/:host/process/:process/logs': 'processLogs',
    'host/:host/process/:process/exceptions': 'processExceptions',
    '': 'catchAll',
    '(*path)': 'catchAll'
  },

  host: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    app.hosts.forEach(function(host) {
      host.selectedProcess = null
    })

    this.trigger('page', new HostOverviewPage({
      model: host
    }))
  },

  hostProcessList: function(hostName) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    app.hosts.forEach(function(host) {
      host.selectedProcess = null
    })

    this.trigger('page', new ProcessesPage({
      model: host
    }))
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

    app.hosts.forEach(function(host) {
      host.selectedProcess = null
    })

    host.selectedProcess = process

    this.trigger('page', new ProcessOverviewPage({
      model: process
    }))
  },

  processLogs: function(hostName, processId) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    var process = host.processes.get(processId)

    if(!process) {
      return this.redirectTo('/')
    }

    app.hosts.forEach(function(host) {
      host.selectedProcess = null
    })

    host.selectedProcess = process

    this.trigger('page', new ProcessLogsPage({
      model: process
    }))
  },

  processExceptions: function(hostName, processId) {
    var host = app.hosts.get(hostName)

    if(!host) {
      return this.redirectTo('/')
    }

    var process = host.processes.get(processId)

    if(!process) {
      return this.redirectTo('/')
    }

    app.hosts.forEach(function(host) {
      host.selectedProcess = null
    })

    host.selectedProcess = process

    this.trigger('page', new ProcessExceptionsPage({
      model: process
    }))
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
