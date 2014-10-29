var View = require('ampersand-view'),
  templates = require('../templates')

module.exports = View.extend({
  template: templates.includes.host,
  bindings: {
    'model.name': {
      type: 'text',
      hook: 'name'
    },
    'model.url': {
      type: 'text',
      hook: 'url'
    }
  }
})
