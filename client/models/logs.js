var Collection = require('ampersand-rest-collection'),
  Log = require('./log');

module.exports = Collection.extend({
  url: function() {
    return '/hosts/' + this.parent.collection.parent.name + '/processes/' + this.parent.id + '/logs'
  },
  model: Log
})
