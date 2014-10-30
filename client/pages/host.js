var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig'),
  HostDataView = require('../views/host')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.host,
  render: function () {
    this.renderWithTemplate()

    this.renderSubview(new HostDataView({
      model: this.model
    }), '[data-hook=host-data]')
  }
})
