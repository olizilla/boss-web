var View = require('ampersand-view'),
  templates = require('../../templates'),
  ProcessListView = require('./process')

module.exports = View.extend({
  template: templates.includes.processlist.list,
  render: function () {
    this.renderWithTemplate()

    this.renderCollection(this.model.processes, ProcessListView, '[data-hook=processes]')
  }
})
