var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig')

module.exports = PageView.extend({
  pageTitle: 'Boss',
  template: templates.pages.processdetails,
  render: function () {
    this.renderWithTemplate()
  }
})
