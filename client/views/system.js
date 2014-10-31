var View = require('ampersand-view'),
  templates = require('../templates')

module.exports = View.extend({
  template: templates.includes.system,
  bindings: {
    'model.uptimeFormatted': {
      type: 'text',
      hook: 'uptime'
    },
    'model.cpuSpeed': {
      type: 'text',
      hook: 'cpuSpeed'
    }
  }
})
