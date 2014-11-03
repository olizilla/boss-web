var Collection = require('ampersand-rest-collection'),
  Process = require('./process');

module.exports = Collection.extend({
  url: function() {
    return '/hosts/' + this.parent.name + '/processes'
  },
  model: Process
})
