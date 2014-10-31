var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig'),
  SystemDataView = require('../views/system'),
  CPUDataView = require('../views/cpu')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.host,
  render: function () {
    this.renderWithTemplate()

    this.renderSubview(new SystemDataView({
      model: this.model
    }), '[data-hook=system-data]')
    this.renderSubview(new CPUDataView({
      model: this.model
    }), '[data-hook=cpu-data]')
  }
})
