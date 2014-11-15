var PageView = require('./base'),
  templates = require('../templates'),
  ProcessListView = require('../views/processlist/list'),
  EmptyProcessListView = require('../views/processlist/empty'),
  ViewSwitcher = require('ampersand-view-switcher')

module.exports = PageView.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name
  },
  template: templates.pages.processes,
  render: function () {
    this.renderWithTemplate()

    this.pageContainer = this.queryByHook('view');
    this.pageSwitcher = new ViewSwitcher(this.pageContainer);
    this.emptyListView = new EmptyProcessListView()

    this.listenTo(this.model.processes, 'add remove', this.chooseView.bind(this))

    this.chooseView()
  },
  chooseView: function() {
    if(this.model.processes.length == 0) {
      this.pageSwitcher.set(this.emptyListView)
    } else {
      // for some reason, reusing the same listview doesn't always notice new additions to the collection?!
      this.pageSwitcher.set(new ProcessListView({
        model: this.model
      }))
    }
  }
})
