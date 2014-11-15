var Autowire = require('wantsit').Autowire,
  remote = require('boss-remote'),
  semver = require('semver')

var HostData = function(name, data) {
  this._logger = Autowire
  this._config = Autowire
  this._processDataFactory = Autowire
  this._webSocketResponder = Autowire

  this.name = name
  this.host = data.host
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
    },
    '_updateServerStatusTimeout': {
      value: null,
      writable: true
    },
    '_updateProcessesTimeout': {
      value: null,
      writable: true
    }
  })
}

HostData.prototype.afterPropertiesSet = function() {
  this.status = 'connecting'

  this._connectToDaemon()
}

HostData.prototype._connectToDaemon = function() {
  this.status = 'connecting'

  remote(this._logger, this._data, this._connectedToDaemon.bind(this))
}

HostData.prototype._connectedToDaemon = function(error, boss) {
  boss.on('disconnected', function() {
    boss.off('*')
    boss.off('process:log:*')

    clearTimeout(this._updateServerStatusTimeout)
    clearTimeout(this._updateProcessesTimeout)

    this.status = 'connecting'
  }.bind(this))

  if(error) {
    this._logger.error('Error connecting to boss', error)
    this.status = 'error'

    return
  }

  this._remote = boss

  this._remote.getDetails(function(error, details) {
    if (error) {
      this._logger.error('Error getting boss details', error)

      if(error.code == 'TIMEOUT') {
        this.status = 'timeout'
      } else if(error.code == 'INVALIDSIGNATURE') {
        this.status = 'badsignature'
      } else {
        this.status = 'error'
      }

      return
    }

    for (var key in details) {
      this[key] = details[key]
    }

    if (!details.version || !semver.satisfies(details.version, this._config.minVersion)) {
      this.status = 'incompatible'

      return
    }

    this.status = 'connected'

    // update details
    this._updateServerStatus()
    this._updateProcesses()

    this._remote.on('process:log:*', function (type, process, event) {
      var process = this.findProcessById(process.id)

      if (!process) {
        return
      }

      process.log(type.split(':')[2], event.date, event.message)
    }.bind(this))

    this._remote.on('*', function() {
      var args = Array.prototype.slice.call(arguments)
      args.splice(1, 0, this.name)

      this._webSocketResponder.broadcast.apply(this._webSocketResponder, args)
    }.bind(this))

  }.bind(this))
}

HostData.prototype._updateServerStatus = function() {
  this._remote.getServerStatus(function(error, status) {
    if(error) {
      if(error.code == 'TIMEOUT') {
        this.status = 'timeout'
      } else if(error.code == 'INVALIDSIGNATURE') {
        this.status = 'badsignature'
      } else {
        this.status = 'error'
      }

      this._logger.error('Error getting boss status', error)
    } else {
      this.status = 'connected'

      for(var key in status) {
        this[key] = status[key]
      }

      this.lastUpdated = Date.now()

      this._webSocketResponder.broadcast('server:status', this.name, this)
    }

    this._updateServerStatusTimeout = setTimeout(this._updateServerStatus.bind(this), this._config.frequency)
  }.bind(this))
}

HostData.prototype._updateProcesses = function() {
  this._remote.listProcesses(function(error, processes) {
    if(error) {
      if(error.code == 'TIMEOUT') {
        this.status = 'timeout'
      } else if(error.code == 'INVALIDSIGNATURE') {
        this.status = 'badsignature'
      } else {
        this.status = 'error'
      }

      this._logger.error('Error listing processes', error)
    } else {
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

      this._webSocketResponder.broadcast('server:processes', this.name, this.processes)
    }

    this._updateProcessesTimeout = setTimeout(this._updateProcesses.bind(this), this._config.frequency)
  }.bind(this))
}

HostData.prototype._removeMissingProcesses = function(reportedProcesses) {
  this.processes = this.processes.filter(function(existingProcess) {
    for(var i = 0; i < reportedProcesses.length; i++) {
      if(reportedProcesses[i].id == existingProcess.id) {
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
