var PageView = require('./base'),
  templates = require('../templates'),
  ViewSwitcher = require('ampersand-view-switcher')

module.exports = PageView.extend({
  template: templates.pages.process,
  initialize: function() {
    this.listenTo(window.app.socket, 'ws:stop:finished', function(hostName, processId) {
      if(hostName == this.model.collection.parent.name && processId == this.model.id) {
        window.app.router.redirectTo('/host/' + hostName + '/processes')
      }
    }.bind(this))

    this.listenTo(window.app.socket, 'process:aborted', function(hostName, processId) {
      if(hostName == this.model.collection.parent.name && processId == this.model.id) {
        window.app.router.redirectTo('/host/' + hostName + '/processes')
      }
    }.bind(this))

    this.listenTo(window.app.socket, 'process:stopped', function(hostName, processId) {
      if(hostName == this.model.collection.parent.name && processId == this.model.id) {
        window.app.router.redirectTo('/host/' + hostName + '/processes')
      }
    }.bind(this))

    this.listenTo(window.app.socket, 'process:exit', function(hostName, processId) {
      if(hostName == this.model.collection.parent.name && processId == this.model.id) {
        window.app.router.redirectTo('/host/' + hostName + '/processes')
      }
    }.bind(this))
  },
  render: function() {
    this.renderWithTemplate()

    this.pageSwitcher = new ViewSwitcher(this.queryByHook('view'))
    this.chooseView()
  },
  chooseView: function() {
    this.pageSwitcher.set(this.mainTemplate())
  }
})
