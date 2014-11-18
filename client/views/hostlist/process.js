var View = require('ampersand-view'),
  templates = require('../../templates')

module.exports = View.extend({
  template: templates.includes.hostlist.process,
  bindings: {
    'model.name': '[data-hook=process-name]'
  }
})
