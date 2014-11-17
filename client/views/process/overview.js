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

    this.renderSubview(new DetailsView({
      model: this.model
    }), '[data-hook=details]')
    this.renderSubview(new MemoryView({
      model: this.model
    }), '[data-hook=memory]')
    this.renderSubview(new CpuView({
      model: this.model
    }), '[data-hook=cpu]')
  }
})
