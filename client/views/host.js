var View = require('ampersand-view'),
  templates = require('../templates')

module.exports = View.extend({
  template: templates.includes.host,
  bindings: {
    'model.timeFormatted': {
      type: 'text',
      hook: 'time'
    },
    'model.uptimeFormatted': {
      type: 'text',
      hook: 'uptime'
    }
  }
})
