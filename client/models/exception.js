var AmpersandModel = require('ampersand-model')

module.exports = AmpersandModel.extend({
  idAttribute: 'date',
  props: {
    date: 'number',
    message: 'string',
    code: 'string',
    stack: 'string'
  },
  session: {
    visible: ['boolean', true, true]
  }
})
