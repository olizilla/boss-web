var Collection = require('ampersand-rest-collection'),
  Host = require('./host');

module.exports = Collection.extend({
  url: '//hosts',
  mainIndex: 'name',
  model: Host
})
