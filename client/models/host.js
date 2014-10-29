var AmpersandModel = require('ampersand-model'),
  remote = require('boss-remote'),
  config = require('clientconfig'),
  semver = require('semver'),
  async = require('async')

module.exports = AmpersandModel.extend({
  props: {
    name: ['string', true, ''],
    url: ['string', true, ''],
    key: ['string', true, ''],
    version: ['string', true, ''],
    time: ['number', true, 0],
    uptime: ['number', true, 0],
    freeMemory: 'number',
    usedMemory: 'number',
    totalMemory: 'number',
    load: ['array', true, function() {
      return [0, 0, 0]
    }]
  },
  session: {
    selected: ['boolean', true, false],
    remote: ['any', true, null],
    status: {
      type: 'string',
      values: ['connecting', 'connected', 'error', 'incompatible']
    }
  },
  initialize: function() {
    this.status = 'connecting'

    async.waterfall([
      remote.bind(remote, config, {
        url: this.url + '/socket',
        key: this.key
      }),
      function(boss, callback) {
        this.status = 'connected'
        this.remote = boss

        this.remote.getDetails(callback)
      }.bind(this),
      function(details, callback) {
        this.version = details.version

        if(!semver.satisfies(details.version, config.minVersion)) {
          var error = new Error('Incompatible')
          error.code = 'incompatible'

          return callback(error)
        }

        callback()
      }.bind(this),
      function(callback) {
        // set up listeners
        setInterval(this._updateServerStatus.bind(this), config.frequency)
        setInterval(this._updateProcesses.bind(this), config.frequency)

        // and triger them immediately
        this._updateServerStatus()
        this._updateProcesses()

        callback()
      }.bind(this)
    ], function(error) {
      if(error) {
        this.status = error.code || 'error'
        console.warn(error)
        return
      }
    }.bind(this))
  },

  _updateServerStatus: function() {
    this.remote.getServerStatus(function(error, status) {
      if(error) {
        return console.error(error)
      }

      for(var key in status) {
        this[key] = status[key]
      }
    }.bind(this))
  },

  _updateProcesses: function() {

  }
})
