var PageView = require('./base'),
  templates = require('../templates'),
  DetailsView = require('../views/process/details'),
  MemoryView = require('../views/process/memory'),
  CpuView = require('../views/process/cpu'),
  LogsView = require('../views/process/loglist/list')

module.exports = PageView.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.title
  },
  template: templates.pages.process,
  render: function () {
    this.renderWithTemplate()

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

    this.renderSubview(new DetailsView({
      model: this.model
    }), '[data-hook=details]')
    this.renderSubview(new MemoryView({
      model: this.model
    }), '[data-hook=memory]')
    this.renderSubview(new CpuView({
      model: this.model
    }), '[data-hook=cpu]')
    this.renderSubview(new LogsView({
      model: this.model
    }), '[data-hook=logs]')
  }
})
