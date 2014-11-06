var PageView = require('./base'),
  templates = require('../templates')

module.exports = PageView.extend({
  pageTitle: 'Boss - Bad signature',
  render: function () {
    this.renderWithTemplate(this, templates.pages.badsignature)
  }
})
