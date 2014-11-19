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
        var message = this.message.replace(/</g, '&lt;')
        message = message.replace(/>/g, '&gt;')

        return new AnsiToHtml().toHtml(message)
      }
    }
  }
})
