var PageView = require('./base'),
  templates = require('../templates'),
  ProcessListView = require('../views/processlist/list'),
  EmptyProcessListView = require('../views/processlist/empty'),
  ViewSwitcher = require('ampersand-view-switcher')

module.exports = PageView.extend({
  pageTitle: 'Boss Web',
  template: templates.pages.processes,
  render: function () {
    this.renderWithTemplate()

    this.pageContainer = this.queryByHook('view');

    // set up our page switcher for that element
    this.pageSwitcher = new ViewSwitcher(this.pageContainer);

    this.emptyListView = new EmptyProcessListView()
    this.listView = new ProcessListView({
      model: this.model
    })

    if(this.model.processes.isEmpty()) {
      this.pageSwitcher.set(this.emptyListView)
    } else {
      this.pageSwitcher.set(this.listView)
    }
  }
})
