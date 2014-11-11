var View = require('ampersand-view'),
  templates = require('../../../templates'),
  LogListView = require('./entry')

module.exports = View.extend({
  template: templates.includes.process.loglist.list,
  render: function () {
    this._pinned = true

    this.renderWithTemplate()

    this.renderCollection(this.model.logs, LogListView, '[data-hook=logs]')

    this.listenTo(this.model.logs, 'add', this.scrollLogs.bind(this))
    this.scrollLogs()
  },
  events: {
    'click button.logs-pin': 'pinLogs',
    'click button.logs-clear': 'clearLogs'
  },
  pinLogs: function(event) {
    event.preventDefault()
    event.target.blur()

    this._pinned = !this._pinned

    var button = this.query('button.logs-pin')

    if(this._pinned) {
      button.className += ' active'
    } else {
      button.className = button.className.replace(' active', '')
    }
  },
  clearLogs: function(event) {
    event.preventDefault()
    event.target.blur()

    this.model.logs.forEach(function(log) {
      log.visible = false
    })
  },
  scrollLogs: function() {
    setTimeout(function() {
      if(this._pinned) {
        var list = this.query('[data-hook=logs]')

        list.scrollTop = list.scrollHeight
      }
    }.bind(this), 100)
  }
})
