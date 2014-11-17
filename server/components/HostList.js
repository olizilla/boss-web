var Autowire = require('wantsit').Autowire,
  EventEmitter = require('events').EventEmitter,
  util = require('util')

var HostList = function() {
  EventEmitter.call(this)

  this._config = Autowire
  this._logger = Autowire
  this._hostDataFactory = Autowire

  this._hostData = {}
}
util.inherits(HostList, EventEmitter)

HostList.prototype.afterPropertiesSet = function() {
  Object.keys(this._config.hosts).forEach(function(name) {
    this._hostData[name] = this._hostDataFactory.create(name, this._config.hosts[name])
  }.bind(this))
}

HostList.prototype.getHosts = function() {
  var output = []

  Object.keys(this._hostData).forEach(function(key) {
    output.push(this._hostData[key])
  }.bind(this))

  return output
}

HostList.prototype.getHostByName = function(name) {
  return this._hostData[name]
}

HostList.prototype.addLog = function(host, id, type, data) {
  var host = this._hostData[host]

  if(!host) {
    return
  }

  var process = host.findProcessById(id)

  if(!process) {
    return
  }

  process.log(type, data)
}

module.exports = HostList
