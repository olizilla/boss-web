var View = require('ampersand-view'),
  templates = require('../../../templates'),
  ExceptionListView = require('./entry')

module.exports = View.extend({
  template: templates.includes.process.exceptionlist.list,
  render: function () {
    this._pinned = true

    this.renderWithTemplate()

    this.renderCollection(this.model.exceptions, ExceptionListView, '[data-hook=exceptions]')

    this.listenTo(this.model.exceptions, 'add', this.scrollExceptions.bind(this))
    this.scrollExceptions()
  },
  events: {
    'click button.exceptions-pin': 'pinExceptions',
    'click button.exceptions-clear': 'clearExceptions'
  },
  pinExceptions: function(event) {
    event.preventDefault()
    event.target.blur()

    this._pinned = !this._pinned

    var button = this.query('button.exceptions-pin')

    if(this._pinned) {
      button.className += ' active'
    } else {
      button.className = button.className.replace(' active', '')
    }
  },
  clearExceptions: function(event) {
    event.preventDefault()
    event.target.blur()

    this.model.exceptions.forEach(function(exception) {
      exception.visible = false
    })
  },
  scrollExceptions: function() {
    setTimeout(function() {
      if(this._pinned) {
        var list = this.query('[data-hook=exceptions]')

        list.scrollTop = list.scrollHeight
      }
    }.bind(this), 100)
  }
})
