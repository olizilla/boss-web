var View = require('ampersand-view'),
  templates = require('../../templates')

module.exports = View.extend({
  template: templates.includes.processlist.process,
  bindings: {
    'model.pid': '[data-hook=pid]',
    'model.user': '[data-hook=user]',
    'model.group': '[data-hook=group]',
    'model.uptimeFormatted': '[data-hook=uptime]',
    'model.restarts': '[data-hook=restarts]',
    'model.memoryFormatted': '[data-hook=memory]',
    'model.cpuFormatted': '[data-hook=cpu]'
  },
  events: {
    "click td": "showProcess"
  },
  showProcess: function() {
    window.app.router.redirectTo('/host/' + window.location.pathname.split('/')[2] + '/process/' + this.model.id)
  }
})
