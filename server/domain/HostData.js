var Autowire = require('wantsit').Autowire,
  remote = require('boss-remote'),
  semver = require('semver')

var HostData = function(data) {
  this._logger = Autowire
  this._processDataFactory = Autowire
  this._config = Autowire

  this.name = data.name
  this.lastUpdated = Date.now()

  Object.defineProperties(this, {
    'processes': {
      value: [],
      writable: true
    },
    '_data': {
      value: data
    },
    '_remote': {
      value: null,
      writable: true
    }
  })
}

HostData.prototype.afterPropertiesSet = function() {
  this.status = 'connecting'

  remote(this._logger, this._data, function(error, boss) {
    if(error) {
      this._logger.error('Error connecting to boss', error)
      this.status = 'error'

      return
    }

    this._remote = boss

    this._remote.getDetails(function(error, details) {
      if(error) {
        this._logger.error('Error getting boss details', error)
        this.status = 'error'

        return
      }

      for(var key in details) {
        this[key] = details[key]
      }

      if(!details.version || !semver.satisfies(details.version, this._config.server.minVersion)) {
        this.status = 'incompatible'

        return
      }

      this.status = 'connected'

      // set up listeners
      setInterval(this._updateServerStatus.bind(this), this._config.server.frequency)
      setInterval(this._updateProcesses.bind(this), this._config.server.frequency)

      // and trigger them immediately
      this._updateServerStatus()
      this._updateProcesses()

      this._remote.on('process:log:*', function(type, process, event) {
        var process = this.findProcessById(process.id)

        if(!process) {
          return
        }

        process.log(type.split(':')[2], event.date, event.message)
      }.bind(this))
    }.bind(this))
  }.bind(this))
}

HostData.prototype._updateServerStatus = function() {
  this._remote.getServerStatus(function(error, status) {
    if(error) {
      return this._logger.error('Error getting boss status', error)
    }

    this.status = 'connected'

    for(var key in status) {
      this[key] = status[key]
    }

    this.lastUpdated = Date.now()
  }.bind(this))
}

HostData.prototype._updateProcesses = function() {
  this._remote.listProcesses(function(error, processes) {
    if(error) {
      return this._logger.error('Error listing processes', error)
    }

    this.status = 'connected'

    this._removeMissingProcesses(processes)

    processes.forEach(function(data) {
      var existingProcess = this.findProcessById(data.id);

      if(!existingProcess) {
        existingProcess = this._processDataFactory.create(data)
        this.processes.push(existingProcess)
      }

      existingProcess.update(data)
    }.bind(this))

    this.lastUpdated = Date.now()
  }.bind(this))
}

HostData.prototype._removeMissingProcesses = function(reportedProcesses) {
  this.processes = this.processes.filter(function(existingProcess) {
    for(var i = 0; i < reportedProcesses.length; i++) {
      if(reportedProcesses[i].name == existingProcess.name) {
        return true
      }
    }

    return false
  })
}

HostData.prototype.findProcessById = function(id) {
  for(var i = 0; i < this.processes.length; i++) {
    if(this.processes[i].id == id) {
      return this.processes[i]
    }
  }

  return null
}

module.exports = HostData
