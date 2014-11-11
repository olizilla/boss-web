var View = require('ampersand-view'),
  templates = require('../../templates')

module.exports = View.extend({
  template: templates.includes.process.details,
  bindings: {
    'model.pid': '[data-hook=pid]',
    'model.user': '[data-hook=user]',
    'model.group': '[data-hook=group]',
    'model.uptimeFormatted': '[data-hook=uptime]',
    'model.restarts': '[data-hook=restarts]'
  },
  events: {
    'click button.process-gc': 'garbageCollect',
    'click button.process-heap': 'heapDump',
    'click button.process-debug': 'debug',
    'click button.process-restart': 'restart',
    'click button.process-stop': 'stop'
  },
  garbageCollect: function(event) {
    event.preventDefault()
    event.target.blur()

    window.app.socket.emit('process:gc', this.model.collection.parent.name, this.model.id)
  },
  heapDump: function(event) {
    event.preventDefault()
    event.target.blur()

    window.app.socket.emit('process:heapdump', this.model.collection.parent.name, this.model.id)
  },
  debug: function(event) {
    event.preventDefault()
    event.target.blur()

    window.open('http://' +
      this.model.collection.parent.host +
      ':' +
      this.model.collection.parent.debuggerPort +
      '/debug?port=' +
      this.model.debugPort)
  },
  restart: function(event) {
    event.preventDefault()
    event.target.blur()

    window.app.socket.emit('process:restart', this.model.collection.parent.name, this.model.id)
  },
  stop: function(event) {
    event.preventDefault()
    event.target.blur()

    window.app.socket.emit('process:stop', this.model.collection.parent.name, this.model.id)
  }
})
