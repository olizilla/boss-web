var AmpersandModel = require('ampersand-model'),
  moment = require('moment'),
  prettysize = require('prettysize'),
  Logs = require('./logs')

module.exports = AmpersandModel.extend({
  props: {
    debugPort: 'number',
    heapTotal: ['array', true, function() {
      return {
        x: 'number',
        y: 'number'
      }
    }],
    heapUsed: ['array', true, function() {
      return {
        x: 'number',
        y: 'number'
      }
    }],
    residentSize: ['array', true, function() {
      return {
        x: 'number',
        y: 'number'
      }
    }],
    cpu: ['array', true, function() {
      return {
        x: 'number',
        y: 'number'
      }
    }],
    gid: ['number', true, '?'],
    group: ['string', true, '?'],
    id: 'string',
    pid: ['number', true, '?'],
    restarts: ['number', true, '?'],
    title: ['string', true, '?'],
    uid: ['number', true, '?'],
    uptime: ['number', true, '?'],
    user: ['string', true, '?'],
    script: ['string', true, '?'],
    gcRequested: ['boolean', true, false],
    heapDumpRequested: ['boolean', true, false],
    status: {
      type: 'string',
      values: ['starting', 'started', 'restarting', 'stopped', 'errored']
    }
  },
  derived: {
    cpuFormatted: {
      deps: ['cpu'],
      fn: function () {
        if(this.cpu.length == 0) {
          return '?'
        }

        var last = this.cpu[this.cpu.length - 1]

        if(!last) {
          return '?'
        }

        return last.y + '%'
      }
    },
    memoryFormatted: {
      deps: ['heapUsed'],
      fn: function () {
        if(this.heapUsed.length == 0) {
          return '?'
        }

        var last = this.heapUsed[this.heapUsed.length - 1]

        if(!last) {
          return '?'
        }

        return prettysize(last.y, true)
      }
    },
    uptimeFormatted: {
      deps: ['uptime'],
      fn: function () {
        if(this.uptime == '?') {
          return this.uptime
        }

        // uptime is reported in seconds
        return moment.duration(this.uptime * 1000).humanize()
      }
    }
  },
  collections: {
    logs: Logs
  }
})
