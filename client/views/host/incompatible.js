var View = require('ampersand-view'),
  templates = require('../../templates'),
  config = require('clientconfig')

module.exports = View.extend({
  template: templates.includes.host.incompatible,
  render: function() {
    this.renderWithTemplate({
      name: this.model.name,
      version: this.model.version,
      requiredVersion: config.minVersion
    }, templates.includes.host.incompatible)
  }
})
