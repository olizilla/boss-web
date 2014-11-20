var View = require('ampersand-view'),
  templates = require('../../templates'),
  dom = require('ampersand-dom')

module.exports = View.extend({
  template: templates.includes.process.overview.details,
  bindings: {
    'model.pid': '[data-hook=pid]',
    'model.user': '[data-hook=user]',
    'model.group': '[data-hook=group]',
    'model.uptimeFormatted': '[data-hook=uptime]',
    'model.restarts': '[data-hook=restarts]',
    'model.isGc': {
      type: function (el, value) {
        el.disabled = value

        var i = $(el).find('i')

        if(value) {
          $(i).removeClass('fa-trash')
          $(i).addClass('fa-circle-o-notch')
          $(i).addClass('fa-spin')
        } else {
          $(i).addClass('fa-trash')
          $(i).removeClass('fa-circle-o-notch')
          $(i).removeClass('fa-spin')
        }
      },
      selector: '[data-hook=gcbutton]'
    },
    'model.isHeapDump': {
      type: function (el, value) {
        el.disabled = value

        var i = $(el).find('i')

        if(value) {
          $(i).removeClass('fa-h-square')
          $(i).addClass('fa-circle-o-notch')
          $(i).addClass('fa-spin')
        } else {
          $(i).addClass('fa-h-square')
          $(i).removeClass('fa-circle-o-notch')
          $(i).removeClass('fa-spin')
        }
      },
      selector: '[data-hook=heapdumpbutton]'
    },
    'model.isRestarting': {
      type: function (el, value) {
        el.disabled = value

        var i = $(el).find('i')

        if(value) {
          $(i).removeClass('fa-refresh')
          $(i).addClass('fa-circle-o-notch')
          $(i).addClass('fa-spin')
        } else {
          $(i).addClass('fa-refresh')
          $(i).removeClass('fa-circle-o-notch')
          $(i).removeClass('fa-spin')
        }
      },
      selector: '[data-hook=restartbutton]'
    },
    'model.isStopping': {
      type: function (el, value) {
        el.disabled = value

        var i = $(el).find('i')

        if(value) {
          $(i).removeClass('fa-stop')
          $(i).addClass('fa-circle-o-notch')
          $(i).addClass('fa-spin')
        } else {
          $(i).addClass('fa-stop')
          $(i).removeClass('fa-circle-o-notch')
          $(i).removeClass('fa-spin')
        }
      },
      selector: '[data-hook=stopbutton]'
    }
  },
  events: {
    'click button.process-gc': 'garbageCollect',
    'click button.process-heap': 'heapDump',
    'click button.process-debug': 'debug',
    'click button.process-restart': 'restart',
    'click button.process-stop': 'stop',
    'click button.process-addworker': 'addWorker',
    'click button.process-removeworker': 'removeWorker'
  },
  garbageCollect: function(event) {
    event.preventDefault()
    event.target.blur()

    this.model.isGc = true

    window.app.socket.emit('process:gc', this.model.collection.parent.name, this.model.id)

    setTimeout(function() {
      if(!this.model.isGc) {
        return
      }

      this.model.isGc = false
    }.bind(this), 5000)
  },
  heapDump: function(event) {
    event.preventDefault()
    event.target.blur()

    this.model.isHeapDump = true

    window.app.socket.emit('process:heapdump', this.model.collection.parent.name, this.model.id)

    setTimeout(function() {
      if(!this.model.isHeapDump) {
        return
      }

      this.model.isHeapDump = false
    }.bind(this), 5000)
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

    this.model.isRestarting = true

    window.app.socket.emit('process:restart', this.model.collection.parent.name, this.model.id)
  },
  stop: function(event) {
    event.preventDefault()
    event.target.blur()

    this.model.isStopping = true

    window.app.socket.emit('process:stop', this.model.collection.parent.name, this.model.id)
  },
  addWorker: function(event) {
    event.preventDefault()
    event.target.blur()

    window.app.socket.emit('cluster:addworker', this.model.collection.parent.name, this.model.id)
  },
  removeWorker: function(event) {
    event.preventDefault()
    event.target.blur()

    window.app.socket.emit('cluster:removeworker', this.model.collection.parent.name, this.model.id)
  }
})
