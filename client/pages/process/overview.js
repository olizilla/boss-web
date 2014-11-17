var ProcessPage = require('../process'),
  templates = require('../../templates'),
  ProcessOverviewView = require('../../views/process/overview')

module.exports = ProcessPage.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name + ' - overview'
  },
  mainTemplate: function() {
    if(!this._mainView) {
      this._mainView = new ProcessOverviewView({
        model: this.model
      })
    }

    return this._mainView
  },
  remove: function() {
    ProcessPage.prototype.remove.call(this)

    this._mainView.remove()
  }
})
