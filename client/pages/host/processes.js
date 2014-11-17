var HostPage = require('../host'),
  templates = require('../../templates'),
  ProcessListView = require('../../views/processlist/list'),
  EmptyProcessListView = require('../../views/processlist/empty')

module.exports = HostPage.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name + ' - processes'
  },
  mainTemplate: function() {
    if(this.model.processes.length == 0) {
      return new EmptyProcessListView({
        model: this.model
      })
    } else {
      // for some reason, reusing the same listview doesn't always notice new additions to the collection?!
      return new ProcessListView({
        model: this.model
      })
    }
  },
  render: function () {
    HostPage.prototype.render.call(this)

    this.listenTo(this.model.processes, 'add remove', this.chooseView.bind(this))
  }
})
