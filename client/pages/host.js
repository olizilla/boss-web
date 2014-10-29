var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  render: function () {
    this._chooseTemplate()

    this.model.on('change:status', this._chooseTemplate.bind(this));
  },
  _chooseTemplate: function() {
    if (this.model.status == 'connecting') {
      this.renderWithTemplate(this, templates.pages.connecting)
    } else if (this.model.status == 'connected') {
      this.renderWithTemplate(this, templates.pages.host)
    } else if (this.model.status == 'incompatible') {
      this.renderWithTemplate({
        name: this.model.name,
        version: this.model.version,
        requiredVersion: config.minVersion
      }, templates.pages.incompatible)
    } else {
      this.renderWithTemplate(this, templates.pages.error)
    }
  }
})
