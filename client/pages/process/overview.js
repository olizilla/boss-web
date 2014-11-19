var ProcessPage = require('../process'),
  templates = require('../../templates'),
  ProcessOverviewView = require('../../views/process/overview')

module.exports = ProcessPage.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name + ' - overview'
  },
  mainTemplate: function() {
    return new ProcessOverviewView({
      model: this.model
    })
  }
})
