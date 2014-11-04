var AmpersandModel = require('ampersand-model'),
  AnsiToHtml = require('ansi-to-html')

module.exports = AmpersandModel.extend({
  idAttribute: 'date',
  props: {
    type: ['info', 'warn', 'error', 'debug'],
    date: 'number',
    message: 'string'
  },
  session: {
    visible: ['boolean', true, true]
  },
  derived: {
    messageFormatted: {
      deps: ['message'],
      fn: function () {
        return new AnsiToHtml().toHtml(this.message)
      }
    }
  }
})
