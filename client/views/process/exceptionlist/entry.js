var View = require('ampersand-view'),
  templates = require('../../../templates'),
  dom = require('ampersand-dom')

module.exports = View.extend({
  template: templates.includes.process.exceptionlist.entry,
  bindings: {
    'model.visible': {
      type: 'booleanClass',
      selector: 'tr',
      name: 'visible'
    }
  },
  events: {
    "click li": "showDetails"
  },
  showDetails: function(event) {
    if(event.target.nodeName.toUpperCase() != 'LI') {
      return
    }

    var stack = this.query('.stack')

    if(dom.hasClass(stack, 'visible')) {
      dom.removeClass(stack, 'visible')
    } else {
      dom.addClass(stack, 'visible')
    }
  }
})
