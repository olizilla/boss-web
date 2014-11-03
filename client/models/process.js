var AmpersandModel = require('ampersand-model'),
  config = require('clientconfig'),
  async = require('async'),
  moment = require('moment'),
  prettysize = require('prettysize')

module.exports = AmpersandModel.extend({
  props: {
    heapTotal: ['array', true, function() {
      return {
        x: 'number',
        y: 'number'
      }
    }],
    heapTotal: ['array', true, function() {
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
    logs: ['array', true, function() {
      return {
        type: ['info', 'warn', 'error', 'debug'],
        date: 'date',
        message: 'string'
      }
    }],
    gid: 'number',
    group: 'string',
    id: 'string',
    pid: 'number',
    restarts: 'number',
    title: 'string',
    uid: 'number',
    uptime: 'number',
    user: 'string'
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
      deps: ['residentSize'],
      fn: function () {
        if(this.residentSize.length == 0) {
          return '?'
        }

        var last = this.residentSize[this.residentSize.length - 1]

        if(!last) {
          return '?'
        }

        return prettysize(last.y, true)
      }
    },
    uptimeFormatted: {
      deps: ['uptime'],
      fn: function () {
        // uptime is reported in seconds
        return moment.duration(this.uptime * 1000).humanize()
      }
    }
  }
})
