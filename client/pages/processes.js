var PageView = require('./base'),
  templates = require('../templates'),
  config = require('clientconfig')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.processes,
  render: function () {
    this.renderWithTemplate()


  }
})
