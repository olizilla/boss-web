var View = require('ampersand-view'),
  templates = require('../../templates'),
  SystemDataView = require('./system'),
  ResourceDataView = require('./resources')

module.exports = View.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name + ' - overview'
  },
  template: templates.includes.host.overview,
  render: function () {
    this.renderWithTemplate()

    this.renderSubview(new SystemDataView({
      model: this.model
    }), '[data-hook=system-data]')
    this.renderSubview(new ResourceDataView({
      model: this.model
    }), '[data-hook=resource-data]')
  }
})
