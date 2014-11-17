var ProcessPage = require('../process'),
  templates = require('../../templates'),
  LogsView = require('../../views/process/loglist/list')

module.exports = ProcessPage.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name + ' - logs'
  },
  mainTemplate: function() {
    return new LogsView({
      model: this.model
    })
  }
})
