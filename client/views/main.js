// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view'),
  ViewSwitcher = require('ampersand-view-switcher'),
  _ = require('underscore'),
  domify = require('domify'),
  dom = require('ampersand-dom'),
  templates = require('../templates'),
  setFavicon = require('favicon-setter'),
  HostListView = require('./hostlist/list'),
  pkg = require('../../package.json')

module.exports = View.extend({
  template: templates.body,
  initialize: function () {
    // this marks the correct nav item selected
    this.listenTo(app.router, 'page', this.handleNewPage)
  },
  events: {
    'click a[href]': 'handleLinkClick',
    'click a[href] i': 'handleLinkClickParent',
    'click a[href] span': 'handleLinkClickParent',
    'click [data-hook=toggle-nav]' : 'toggleNav',
    'click #nav-shadow': 'hideNavIfShowing'
  },
  render: function() {
    // some additional stuff we want to add to the document head
    document.head.appendChild(domify(templates.head()))

    // main renderer
    this.renderWithTemplate()

    // list of hosts on the left
    this.renderSubview(new HostListView(), '[data-hook=nav-container]')

    // init and configure our page switcher
    this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
      show: function (newView, oldView) {
        // it's inserted and rendered for me
        document.title = _.result(newView, 'pageTitle') || "Boss"
        document.scrollTop = 0

        // add a class specifying it's active
        dom.addClass(newView.el, 'active')

        // store an additional reference, just because
        app.currentPage = newView
      }
    });

    // setting a favicon for fun (note, it's dynamic)
    setFavicon('/images/favicon.png')

    this.query('[data-hook=version]').textContent = pkg.version

    return this
  },

  handleNewPage: function(view) {
    // tell the view switcher to render the new one
    this.pageSwitcher.set(view)

    // mark the correct nav item selected
    this.updateActiveNav()
  },

  handleLinkClick: function(e) {
    var aTag = e.target
    var local = aTag.host === window.location.host

    // if it's a plain click (no modifier keys)
    // and it's a local url, navigate internally
    if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
      e.preventDefault()
      app.navigate(aTag.pathname)
    }
  },

  handleLinkClickParent: function(e) {
    var aTag = e.target.parentNode
    var local = aTag.host === window.location.host

    // if it's a plain click (no modifier keys)
    // and it's a local url, navigate internally
    if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
      e.preventDefault()
      app.navigate(aTag.pathname)
    }
  },

  updateActiveNav: function() {
    var path = window.location.pathname

    this.queryAll('.nav ul.active').forEach(function (aTag) {
      var target = aTag.children[0].children[0].href
      var parts = target.split(/^(.*:)\/\/([a-z\-.]+)(:[0-9]+)?(.*)$/)
      var targetPath = parts[4]

      if(
        (path.length > targetPath.length && path.indexOf(targetPath) == -1)
        ||
        (path.length < targetPath.length && targetPath.indexOf(path) == -1)
        ||
        (path.length == targetPath.length && targetPath != path)
      ) {
        dom.removeClass(aTag, 'active')
      }
    })

    path = path.slice(1)

    this.queryAll('.nav a[href]').forEach(function (aTag) {
      var aPath = aTag.pathname.slice(1)

      if ((!aPath && !path) || (aPath == path)) {
        dom.addClass(aTag.parentNode, 'active')
      } else {
        dom.removeClass(aTag.parentNode, 'active')
      }
    })

    this.hideNavIfShowing()
  },

  toggleNav: function() {
    var navBar = this.query('[data-hook=nav-container]')
    var navShadow = this.query('#nav-shadow')
    var classes = Array.prototype.slice.call(navBar.classList)

    if(classes.indexOf('collapse') == -1) {
      classes.push('collapse')
      navShadow.className = ''
    } else {
      classes = classes.filter(function(existingClassName) {
        return existingClassName != 'collapse'
      })
      navShadow.className = 'shadow'
    }

    navBar.className = classes.join(' ')
  },

  hideNavIfShowing: function() {
    var navBar = this.query('[data-hook=nav-container]')
    var navShadow = this.query('#nav-shadow')
    var classes = Array.prototype.slice.call(navBar.classList)

    if(classes.indexOf('collapse') == -1) {
      classes.push('collapse')
      navShadow.className = ''
    }

    navBar.className = classes.join(' ')
  }
})
