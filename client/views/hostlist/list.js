var View = require('ampersand-view'),
  templates = require('../../templates'),
  HostListView = require('./host'),
  dom = require('ampersand-dom')

module.exports = View.extend({
  template: templates.includes.hostlist.list,
  render: function () {
    this.renderWithTemplate()

    this.renderCollection(app.hosts, HostListView, '[data-hook=host-list]')

    this.updateActiveNav()

    this.listenTo(app.hosts, 'add remove', this.updateActiveNav.bind(this))
  },
  updateActiveNav: function() {
    var path = window.location.pathname.slice(1)

    this.queryAll('.nav a[href]').forEach(function (aTag) {
      var aPath = aTag.pathname.slice(1)

      if ((!aPath && !path) || (aPath == path)) {
        dom.addClass(aTag.parentNode, 'active')
      } else {
        dom.removeClass(aTag.parentNode, 'active')
      }
    })
  }
})
