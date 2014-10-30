var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig')

module.exports = PageView.extend({
  pageTitle: 'Boss - incompatible',
  render: function () {
    this.renderWithTemplate({
      name: this.model.name,
      version: this.model.version,
      requiredVersion: config.minVersion
    }, templates.pages.incompatible)
  }
})
