var View = require('ampersand-view'),
  templates = require('../templates')

module.exports = View.extend({
  template: templates.includes.host,
  bindings: {
    'model.uptimeFormatted': {
      type: 'text',
      hook: 'uptime'
    }
  }
})
