var Emitter = require('component-emitter')

Emitter.prototype.emit = function(event) {
  this._callbacks = this._callbacks || {}

  var argsWithoutEvent = Array.prototype.slice.call(arguments, 1)
  var argsWithEvent = Array.prototype.slice.call(arguments, 0)

  for(var eventName in this._callbacks) {
    if(!Array.isArray(this._callbacks[eventName])) {
      continue
    }

    var callbacks = this._callbacks[eventName].slice()
    var hasWildCard = eventName.indexOf('*') != -1
    var subEvent = eventName.split('*')[0]

    if(eventName == event) {
      for(var i = 0; i < callbacks.length; i++) {
        callbacks[i].apply(this, argsWithoutEvent)
      }
    } else if(hasWildCard && event.substring(0, subEvent.length) == subEvent) {
      for(var i = 0; i < callbacks.length; i++) {
        callbacks[i].apply(this, argsWithEvent)
      }
    }
  }
}

var notify = require('./notification'),
  SocketIO = require('socket.io-client')

function withHostAndProcess(hostName, processId, callback) {
  withHost(hostName, function(host) {
    var process = host.processes.get(processId)

    if(!process) {
      return
    }

    callback(host, process)
  })
}

function withHost(hostName, callback) {
  var host = app.hosts.get(hostName)

  if(!host) {
    return
  }

  callback(host)
}

var socket = SocketIO('//')
socket.on('connect_error', function(error) {
  console.info('connect_error', error)
})
socket.on('connect_timeout', function() {
  notify({
    header: 'Connection timeout',
    message: 'The websocket timed out while connecting to boss-web',
    type: 'danger'
  })
})
socket.on('reconnect_attempt', function() {
  console.info('reconnect_attempt')
})
socket.on('reconnecting', function(count) {
  console.info('reconnecting', count)
})
socket.on('reconnect_error', function(error) {
  console.info('reconnect_error', error)
})
socket.on('reconnect_failed', function() {
  console.info('reconnect_failed')
})
socket.on('reconnect', function(count) {
  notify({
    header: 'boss-web came back',
    message: 'Reconnected after ' + count + ' attempts',
    type: 'info'
  })
})
socket.on('disconnect', function() {
  notify({
    header: 'boss-web went away',
    message: 'Lost connection',
    type: 'danger'
  })
})
socket.on('disconnected', function(hostName) {
  notify({
    header: 'Lost connection',
    message: 'Disconnected from ' + hostName,
    type: 'danger'
  })
})
socket.on('event', function() {
  console.info('event', arguments)
})
socket.on('ws:gc:finished', function(hostName, processId) {
  withHostAndProcess(hostName, processId, function(host, process) {
    notify({
      header: 'Garbage collection complete',
      host: host.name,
      process: process.name,
      message: 'has collected garbage',
      type: 'success'
    })
  })
})
socket.on('ws:heap:finished', function(hostName, processId, path) {
  withHostAndProcess(hostName, processId, function(host, process) {
    notify({
      header: 'Heap dump complete',
      host: host.name,
      process: process.name,
      message: 'has dumped heap to ' + path.split('/').pop(),
      type: 'success'
    })
  })
})
socket.on('ws:restart:error', function(hostName, processId, error) {
  withHostAndProcess(hostName, processId, function(host, process) {
    process.isRestarting = false

    notify({
      header: 'Restart error',
      host: host.name,
      process: process.name,
      message: 'failed to restart - ' + error.message,
      type: 'danger'
    })
  })
})
socket.on('ws:restart:finished', function(hostName, processId) {
  withHostAndProcess(hostName, processId, function(host, process) {
    notify({
      header: 'Restart complete',
      host: host.name,
      process: process.name,
      message: 'restarted',
      type: 'success'
    })
  })
})
socket.on('ws:stop:finished', function(hostName, processId) {
  withHostAndProcess(hostName, processId, function (host, process) {
    notify({
      header: 'Process stopped',
      host: host.name,
      process: process.name,
      message: 'stopped',
      type: 'success'
    })
  })
})
socket.on('process:log:info', function(hostName, process, log) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.logs.add({
      type: 'info',
      date: log.date,
      message: log.message
    })
  })
})
socket.on('process:log:warn', function(hostName, process, log) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.logs.add({
      type: 'warn',
      date: log.date,
      message: log.message
    })
  })
})
socket.on('process:log:debug', function(hostName, process, log) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.logs.add({
      type: 'debug',
      date: log.date,
      message: log.message
    })
  })
})
socket.on('process:log:error', function(hostName, process, log) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.logs.add({
      type: 'error',
      date: log.date,
      message: log.message
    })
  })
})

socket.on('*', function() {
  if(arguments[0].substring(0, 'process:log'.length) != 'process:log' &&
    arguments[0].substring(0, 'server:status'.length) != 'server:status' &&
    arguments[0].substring(0, 'server:processes'.length) != 'server:processes'
  ) {
    console.info('incoming!', arguments)
  }
})

socket.on('server:status', function(hostName, data) {
  app.hosts.add(data, {
    merge: true
  })
})
socket.on('server:processes', function(hostName, processes) {
  withHost(hostName, function(host) {
    var incomingProcesses = []
    var newProcesses = []

    processes.forEach(function(process) {
      incomingProcesses.push(process)

      if(process.workers) {
        process.workers.forEach(function(worker) {
          worker.clusterManager = process.id

          incomingProcesses.push(worker)
        })
      }

      if(!host.processes.get(process.id)) {
        newProcesses.push(process.id)
      }
    })

    host.processes.forEach(function(existingProcess) {
      var present = false

      incomingProcesses.forEach(function(process) {
        if(process.id == existingProcess.id) {
          present = true
        }
      })

      if(!present) {
        host.processes.remove(existingProcess)
      }
    })

    host.processes.add(incomingProcesses, {
      merge: true
    })

    // fetch any existing logs/exceptions
    newProcesses.forEach(function(id) {
      var process = host.processes.get(id)
      process.logs.fetch()
      process.exceptions.fetch()
    })
  })
})

socket.on('process:gc:start', function(hostName, process) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.isGc = true
  })
})
socket.on('process:gc:complete', function(hostName, process) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.isGc = false
  })
})

socket.on('process:heapdump:start', function(hostName, process) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.isHeapDump = true
  })
})
socket.on('process:heapdump:complete', function(hostName, process) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.isHeapDump = false
  })
})
socket.on('process:heapdump:error', function(hostName, process) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.isHeapDump = false
  })
})
socket.on('process:restarting', function(hostName, process) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.isRestarting = true
  })
})
socket.on('process:restarted', function(hostName, process) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    process.isRestarting = false
  })
})

socket.on('process:aborted', function(hostName, process) {
  withHostAndProcess(hostName, process.id, function(host, process) {
    notify({
      header: 'Aborted',
      host: host.name,
      process: process.name,
      message: 'restarted too many times and was aborted',
      type: 'danger'
    })
  })
})


module.exports = socket
