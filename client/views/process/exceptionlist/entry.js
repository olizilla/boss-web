var View = require('ampersand-view'),
  templates = require('../../../templates')

module.exports = View.extend({
  template: templates.includes.process.exceptionlist.entry,
  bindings: {
    'model.visible': {
      type: 'booleanClass',
      selector: 'li',
      name: 'visible'
    }
  }
})
