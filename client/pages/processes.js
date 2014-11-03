var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig'),
  ProcessListView = require('../views/processlist')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.processes,
  render: function () {
    this.renderWithTemplate()

    this.renderCollection(this.model.processes, ProcessListView, '[data-hook=process-list]')
  },
  events: {
    "click li": "showProcess"
  },
  showProcess: function(event) {
    var id = null
    var target = event.delegateTarget

    while(target && target.nodeName.toLowerCase() != 'ul') {
      target = target.parentNode

      if(target.nodeName.toLowerCase() == 'ul') {
        id = target.getAttribute('data-boss-process-id')
      }
    }

    if(!id) {
      return
    }

    window.app.router.redirectTo('/host/' + this.model.name + '/process/' + id)
  }
})
