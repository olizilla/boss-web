var PageView = require('./base'),
  templates = require('../templates'),
  DetailsView = require('../views/process/details'),
  MemoryView = require('../views/process/memory'),
  CpuView = require('../views/process/cpu'),
  LogsView = require('../views/process/logs')

module.exports = PageView.extend({
  pageTitle: 'Boss',
  template: templates.pages.process,
  render: function () {
    this.renderWithTemplate()

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
