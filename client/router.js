var Router = require('ampersand-router'),
  HostPage = require('./pages/host'),
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

    this.trigger('page', new HostPage({
      model: host
    }))
  },

  catchAll: function () {
    this.redirectTo('/host/' + window.app.hosts.at(0).name)
  }
})
