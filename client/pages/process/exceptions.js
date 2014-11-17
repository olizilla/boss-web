var ProcessPage = require('../process'),
  templates = require('../../templates'),
  EmptyExceptionsListView = require('../../views/process/exceptionlist/empty'),
  ExceptionsView = require('../../views/process/exceptionlist/list')

module.exports = ProcessPage.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name + ' - exceptions'
  },
  initialize: function() {
    this.listenTo(this.model.exceptions, 'add remove', this.chooseView.bind(this))
  },
  mainTemplate: function() {
    if(this.model.exceptions.length == 0) {
      return new EmptyExceptionsListView({
        model: this.model
      })
    } else {
      return new ExceptionsView({
        model: this.model
      })
    }
  }
})
