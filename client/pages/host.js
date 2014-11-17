var PageView = require('./base'),
  templates = require('../templates'),
  ViewSwitcher = require('ampersand-view-switcher'),
  Connecting = require('../views/host/connecting'),
  ConnectionTimedOut = require('../views/host/connectiontimedout')

module.exports = PageView.extend({
  template: templates.pages.host,
  render: function () {
    this.renderWithTemplate()

    this.pageSwitcher = new ViewSwitcher(this.queryByHook('view'));

    this.chooseView()
  },
  chooseView: function() {
    if(this.model.status == 'connected') {
      this.pageSwitcher.set(this.mainTemplate())
    } else if(this.model.status == 'connecting') {
      this.pageSwitcher.set(new Connecting({
        model: this.model
      }))
    } else if(this.model.status == 'connectiontimedout') {
      this.pageSwitcher.set(new ConnectionTimedOut({
        model: this.model
      }))
    }

  },
  bindings: {
    'model.status': {
      type: function (el, value, previousValue) {
        this.chooseView()
      },
      selector: 'view'
    }
  }
})
