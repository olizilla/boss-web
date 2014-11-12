var notify = require('./notification'),
  SocketIO = require('socket.io-client'),
  WildEmitter = require('wildemitter')

function withHostAndProcess(hostName, processId, callback) {
  var host = app.hosts.get(hostName)

  if(!host) {
    return
  }

  var process = host.processes.get(processId)

  if(!process) {
    return
  }

  callback(host, process)
}

var socket = SocketIO('//');
//socket.callbacks = {}

for(var key in WildEmitter.prototype) {
  if(typeof WildEmitter.prototype[key] != 'function') {}

  //socket[key] = WildEmitter.prototype[key]
}

socket.on('connect', function() {
  console.info('connect')
})
socket.on('connect_error', function(error) {
  console.info('connect_error', error)
})
socket.on('connect_timeout', function() {
  console.info('connect_timeout')
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
  console.info('reconnect', count)
})
socket.on('disconnect', function() {
  console.info('disconnect')
})
socket.on('event', function() {
  console.info('event', arguments)
})
socket.on('ws:gc:finished', function(hostName, processId) {
  withHostAndProcess(hostName, processId, function(host, process) {
    notify({
      header: 'Garbage collection complete',
      host: host.name,
      process: process.title,
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
      process: process.title,
      message: 'has dumped heap to ' + path.split('/').pop(),
      type: 'success'
    })
  })
})
socket.on('ws:restart:finished', function(hostName, processId) {
  withHostAndProcess(hostName, processId, function(host, process) {
    notify({
      header: 'Restart complete',
      host: host.name,
      process: process.title,
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
      process: process.title,
      message: 'stopped',
      type: 'success'
    })
  })
})
socket.on('localhost:process:log:info:*', function() {
  console.info('incoming log!', arguments)
})
socket.on('*', function() {
  console.info('incoming!', arguments)
})

module.exports = socket