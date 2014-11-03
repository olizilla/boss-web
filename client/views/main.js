// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view'),
  ViewSwitcher = require('ampersand-view-switcher'),
  _ = require('underscore'),
  domify = require('domify'),
  dom = require('ampersand-dom'),
  templates = require('../templates'),
  setFavicon = require('favicon-setter'),
  HostListView = require('./hostlist')

module.exports = View.extend({
  template: templates.body,
  initialize: function () {
    // this marks the correct nav item selected
    this.listenTo(app.router, 'page', this.handleNewPage)
  },
  events: {
    'click a[href]': 'handleLinkClick',
    'click [data-hook=toggle-nav]' : 'toggleNav'
  },
  render: function () {
    // some additional stuff we want to add to the document head
    document.head.appendChild(domify(templates.head()))

    // main renderer
    this.renderWithTemplate()
    this.renderCollection(app.hosts, HostListView, '[data-hook=host-list]')

    // init and configure our page switcher
    this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
      show: function (newView, oldView) {
        // it's inserted and rendered for me
        document.title = _.result(newView, 'pageTitle') || "boss-web"
        document.scrollTop = 0

        // add a class specifying it's active
        dom.addClass(newView.el, 'active')

        // store an additional reference, just because
        app.currentPage = newView
      }
    });

    // setting a favicon for fun (note, it's dynamic)
    setFavicon('/images/favicon.png')

    return this
  },

  handleNewPage: function (view) {
    // tell the view switcher to render the new one
    this.pageSwitcher.set(view)

    // mark the correct nav item selected
    this.updateActiveNav()
  },

  handleLinkClick: function (e) {
    var aTag = e.target
    var local = aTag.host === window.location.host

    // if it's a plain click (no modifier keys)
    // and it's a local url, navigate internally
    if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
      e.preventDefault()
      app.navigate(aTag.pathname)
    }
  },

  updateActiveNav: function () {
    var path = window.location.pathname.slice(1);

    this.queryAll('.nav a[href]').forEach(function (aTag) {
      var aPath = aTag.pathname.slice(1);

      if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
        dom.addClass(aTag.parentNode, 'active');
      } else {
        dom.removeClass(aTag.parentNode, 'active');
      }
    });
  },

  toggleNav: function(event) {
    var sourceElement = event.srcElement

    while(!sourceElement.hasAttribute('data-target')) {
      if(!sourceElement.parentNode) {
        return
      }

      sourceElement = sourceElement.parentNode
    }

    var targetElementClassName = sourceElement.getAttribute('data-target')
    var toggleClassName = sourceElement.getAttribute('data-toggle')
    var targetElement = this.query(targetElementClassName)
    var classes = Array.prototype.slice.call(targetElement.classList)

    if(classes.indexOf(toggleClassName) == -1) {
      classes.push(toggleClassName)
    } else {
      classes = classes.filter(function(existingClassName) {
        return existingClassName != toggleClassName
      })
    }

    targetElement.className = classes.join(' ')
  }
})
