var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig'),
  ProcessListView = require('../views/processlist')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.processes,
  render: function () {
    this.renderWithTemplate()

    this.renderCollection(this.model.processes, ProcessListView, '[data-hook=process-list]')
  }
})
