var Autowire = require("wantsit").Autowire

var HostList = function() {
  this._config = Autowire
  this._logger = Autowire
  this._hostDataFactory = Autowire

  this._hostData = {}
}

HostList.prototype.afterPropertiesSet = function() {
  Object.keys(this._config.hosts).forEach(function(name) {
    this._hostData[name] = this._hostDataFactory.create(name, this._config.hosts[name])
  }.bind(this))

  setInterval(this._hostPurge.bind(this), this._config.hostPurge.frequency)
}

HostList.prototype._hostPurge = function() {
  var now = Date.now()

  Object.keys(this._hostData).forEach(function(key) {
    if(this._hostData[key].status == 'connecting') {
      return
    }

    if(now - this._hostData[key].lastUpdated > this._config.hostPurge.cutoff) {
      this._logger.info("HostList", key, "has gone away")
      delete this._hostData[key]
    }
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
