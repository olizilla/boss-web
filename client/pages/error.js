var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig')

module.exports = PageView.extend({
  pageTitle: 'Boss - error',
  render: function () {
    this.renderWithTemplate(this, templates.pages.error)
  }
})
