var View = require('ampersand-view'),
  templates = require('../../templates'),
  DetailsView = require('./details'),
  MemoryView = require('./memory'),
  CpuView = require('./cpu')

module.exports = View.extend({
  pageTitle: function() {
    return 'Boss - ' + this.model.name
  },
  template: templates.includes.process.overview.index,
  render: function () {
    this.renderWithTemplate()

    this._detailsView = new DetailsView({
      model: this.model
    })
    this._memoryView = new MemoryView({
      model: this.model
    })
    this._cpuView = new CpuView({
      model: this.model
    })

    this.renderSubview(this._detailsView, '[data-hook=details]')
    this.renderSubview(this._memoryView, '[data-hook=memory]')
    this.renderSubview(this._cpuView, '[data-hook=cpu]')
  }
})
