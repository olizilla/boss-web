var PageView = require('./base'),
  templates = require('../templates'),
  ViewSwitcher = require('ampersand-view-switcher')

module.exports = PageView.extend({
  template: templates.pages.process,
  render: function() {
    this.renderWithTemplate()

    this.pageSwitcher = new ViewSwitcher(this.queryByHook('view'))
    this.chooseView()
  },
  chooseView: function() {
    this.pageSwitcher.set(this.mainTemplate())
  },
  bindings: {
    'model.name': '[data-hook=process-name]',
    'model.status': {
      type: function(el, value) {
        if(value != 'running' && value != 'paused') {
          window.app.router.redirectTo('/host/' + this.model.collection.parent.name + '/processes')
        }
      },
      selector: '[data-hook=view]'
    },
    'model.collection.parent.status': {
      type: function(el, value) {
        if(value != 'connected') {
          window.app.router.redirectTo('/host/' + this.model.collection.parent.name)
        }
      },
      selector: '[data-hook=view]'
    }
  }
})
