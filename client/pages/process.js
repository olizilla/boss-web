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
  remove: function() {
    PageView.prototype.remove.call(this)

    this.pageSwitcher.remove()
  },
  bindings: {
    'model.name': '[data-hook=process-name]',
    'model.status': {
      type: function(el, value) {
        if(!this.pageSwitcher) {
          // these updates can happen during the renderWithTemplate invocation above - at that point
          // we haven't finished rendering and this.pageSwitcher will not be set which causes and
          // error in the remove method so ignore it.  May need to revisit this.
          return
        }

        if(value == 'stopped') {
          window.app.router.redirectTo('/host/' + this.model.collection.parent.name + '/processes')
        }
      },
      selector: '[data-hook=view]'
    }
  }
})
