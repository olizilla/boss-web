var PageView = require('./base'),
  templates = require('../templates'),
  ViewSwitcher = require('ampersand-view-switcher'),
  Connecting = require('../views/host/connecting'),
  ConnectionTimedOut = require('../views/host/connectiontimedout'),
  BadSignature = require('../views/host/badsignature'),
  Timeout = require('../views/host/timeout'),
  Incompatible = require('../views/host/incompatible'),
  HostNotFound = require('../views/host/hostnotfound'),
  ConnectionReset = require('../views/host/connectionreset'),
  ConnectionRefused = require('../views/host/connectionrefused'),
  NetworkDown = require('../views/host/networkdown'),
  ErrorConnecting = require('../views/host/error')

module.exports = PageView.extend({
  template: templates.pages.host,
  render: function() {
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
    } else if(this.model.status == 'connectionrefused') {
      this.pageSwitcher.set(new ConnectionRefused({
        model: this.model
      }))
    } else if(this.model.status == 'connectionreset') {
      this.pageSwitcher.set(new ConnectionReset({
        model: this.model
      }))
    } else if(this.model.status == 'hostnotfound') {
      this.pageSwitcher.set(new HostNotFound({
        model: this.model
      }))
    } else if(this.model.status == 'connectiontimedout') {
      this.pageSwitcher.set(new ConnectionTimedOut({
        model: this.model
      }))
    } else if(this.model.status == 'incompatible') {
      this.pageSwitcher.set(new Incompatible({
        model: this.model
      }))
    } else if(this.model.status == 'timeout') {
      this.pageSwitcher.set(new Timeout({
        model: this.model
      }))
    } else if(this.model.status == 'badsignature') {
      this.pageSwitcher.set(new BadSignature({
        model: this.model
      }))
    } else if(this.model.status == 'networkdown') {
      this.pageSwitcher.set(new NetworkDown({
        model: this.model
      }))
    } else {
      this.pageSwitcher.set(new ErrorConnecting({
        model: this.model
      }))
    }
  },
  bindings: {
    'model.status': {
      type: function() {
        if(!this.pageSwitcher) {
          return
        }

        this.chooseView()
      },
      selector: '[data-hook=view]'
    }
  }
})
