var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig')

module.exports = PageView.extend({
  pageTitle: 'Boss - connecting',
  render: function () {
    this.renderWithTemplate(this, templates.pages.connecting)
  }
})
