var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig'),
  SystemDataView = require('../views/host/system'),
  ResourceDataView = require('../views/host/resources')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.host,
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
