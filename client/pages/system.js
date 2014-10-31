var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig'),
  SystemDataView = require('../views/system'),
  ResourceDataView = require('../views/resources')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.system,
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