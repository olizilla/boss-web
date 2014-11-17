var HostPage = require('../host'),
  templates = require('../../templates'),
  HostOverview = require('../../views/host/overview')

module.exports = HostPage.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name + ' - overview'
  },
  mainTemplate: function() {
    return new HostOverview({
      model: this.model
    })
  }
})
