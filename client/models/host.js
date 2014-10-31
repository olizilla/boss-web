var AmpersandModel = require('ampersand-model'),
  remote = require('boss-remote'),
  config = require('clientconfig'),
  semver = require('semver'),
  async = require('async'),
  moment = require('moment')

module.exports = AmpersandModel.extend({
  props: {
    name: 'string',
    url: 'string',
    key: 'string',
    time: 'number',
    uptime: 'number',
    freeMemory: 'number',
    usedMemory: 'number',
    totalMemory: 'number',
    hostname: ['string', true, ''],
    type: 'string',
    platform: 'string',
    arch: 'string',
    release: 'string',
    cpus: ['array', true, function() {
      return {
        model: 'string',
        speed: 'number',
        times: ['object', false, function () {
          return {
            idle: 'number',
            irq: 'number',
            nice: 'number',
            sys: 'number',
            user: 'number'
          }
        }],
        load: ['object', false, function () {
          return {
            idle: 'number',
            irq: 'number',
            nice: 'number',
            sys: 'number',
            user: 'number'
          }
        }]
      }
    }],
    version: 'string'
  },
  session: {
    selected: ['boolean', true, false],
    remote: ['any', true, null],
    status: {
      type: 'string',
      values: ['connecting', 'connected', 'error', 'incompatible']
    }
  },
  derived: {
    timeFormatted: {
      deps: ['time'],
      fn: function () {
        return moment(this.time).format("YYYY-MM-DD HH:mm:ss Z")
      }
    },
    uptimeFormatted: {
      deps: ['uptime'],
      fn: function () {
        // uptime is reported in seconds
        return moment.duration(this.uptime * 1000).humanize()
      }
    },
    cpuSpeed: {
      deps: ['cpus'],
      fn: function () {
        if(!this.cpus[0]) {
          return ''
        }

        return (this.cpus[0].speed/1000).toFixed(2) + 'GHz'
      }
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
        this.remote = boss
        this.remote.getDetails(callback)
      }.bind(this),
      function(details, callback) {
        for(var key in details) {
          this[key] = details[key]
        }

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

      this.status = 'connected'
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
