var PageView = require('./base'),
  templates = require('../templates')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.timeout
})
