HostProcess = function() {

}

HostProcess.prototype.retrieve = function() {
  // generates GET with a URL parameter named 'id'
}

HostProcess.prototype.retrieveAll = function() {
  // generates GET with no URL parameter
}

HostProcess.prototype.create = function() {
  // generates POST
}

HostProcess.prototype.update = function() {
  // generates PUT
}

HostProcess.prototype.patch = function() {
  // generates PATCH
}

HostProcess.prototype.remove = function() {
  // generates DELETE
}

module.exports = HostProcess
