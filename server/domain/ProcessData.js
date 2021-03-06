var Autowire = require('wantsit').Autowire,
  uuid = require('uuid')

var MILLISECONDS_IN_A_DAY = 86400000

var ProcessData = function(data) {
  this._config = Autowire
  this._processDataFactory = Autowire

  this.heapTotal = []
  this.heapUsed = []
  this.residentSize = []
  this.cpu = []
  this.exceptions = []

  Object.defineProperties(this, {
    'logs': {
      value: [],
      writable: true
    }
  })

  this.afterPropertiesSet = this._map.bind(this, data)
}

ProcessData.prototype.update = function(data) {
  this._map(data)

  if(data.heapTotal === undefined) {
    // partial data (ie. status timed out), skip appending data
    return
  }

  // memory usage is reported in bytes so round it down otherwise
  // we exhaust our datapoint limit really quickly...
  this._append(
    ~~(data.heapTotal / 10000) * 10000,
    ~~(data.heapUsed / 10000) * 10000,
    ~~(data.residentSize / 10000) * 10000,
    data.cpu,
    data.time
  )
}

ProcessData.prototype.log = function(type, date, message) {
  if(!type || !date || !message) {
    return
  }

  this.logs.push({
    type: type,
    date: date,
    message: message
  })

  // rotate logs if necessary
  if(this.logs.length > this._config.logs.max) {
    this.logs.splice(0, this.logs.length - this._config.logs.max)
  }
}

ProcessData.prototype.exception = function(date, message, code, stack) {
  this.exceptions.push({
    id: uuid.v4(),
    date: date,
    message: message,
    code: code,
    stack: stack
  })

  // rotate exceptions if necessary
  if(this.exceptions.length > this._config.exceptions.max) {
    this.exceptions.splice(0, this.exceptions.length - this._config.exceptions.max)
  }
}

ProcessData.prototype._map = function(data) {
  ["debugPort", "gid", "group", "id", "name", "pid", "restarts", "script", "uid", "uptime", "user", "status"].forEach(function(key) {
    this[key] = data[key]
  }.bind(this))

  if(data.workers) {
    this.cluster = true

    if(!this.workers) {
      this.workers = []
    }

    var workers = []

    data.workers.forEach(function(incomingWorker) {
      var worker

      for(var i = 0; i < this.workers.length; i++) {
        if(this.workers[i].id == incomingWorker.id) {
          worker = this.workers[i]

          break
        }
      }

      if(!worker) {
        worker = this._processDataFactory.create(incomingWorker)
      } else {
        worker.update(incomingWorker)
      }

      workers.push(worker)
    }.bind(this))

    this.workers = workers
  }

  if(data.logs) {
    data.logs.forEach(function(log) {
      this.log(log.type, log.date, log.message)
    }.bind(this))
  }
}

ProcessData.prototype._append = function(heapTotal, heapUsed, residentSize, cpu, time) {
  this.heapTotal = this._compressResourceUsage(this.heapTotal, time)
  this.heapUsed = this._compressResourceUsage(this.heapUsed, time)
  this.residentSize = this._compressResourceUsage(this.residentSize, time)
  this.cpu = this._compressResourceUsage(this.cpu, time)

  this._appendIfDifferent(this.heapTotal, heapTotal, time)
  this._appendIfDifferent(this.heapUsed, heapUsed, time)
  this._appendIfDifferent(this.residentSize, residentSize, time)
  this._appendIfDifferent(this.cpu, cpu, time)
}

ProcessData.prototype._appendIfDifferent = function(array, value, time) {
  var rounded = ~~value

  // if the last two datapoints have the same value as the one we're about to add,
  // don't add a third, just change the date of the last one to be now
  // x-----x becomes x-----------x instead of x-----x-----x
  if(array.length > 1 && array[array.length - 1].y == rounded && array[array.length - 2].y == rounded) {
    array[array.length - 1].x = time

    return
  }

  array.push({
    x: time,
    y: rounded
  })
}

ProcessData.prototype._compressResourceUsage = function(data, time) {
  var datapoints = this._config.graph.datapoints
  datapoints -= 1

  var distribution = this._config.graph.distribution
  var maxAgeInDays = distribution.length * MILLISECONDS_IN_A_DAY

  if(data.length < datapoints) {
    return data
  }

  var now = time
  var cutoff = now - maxAgeInDays
  var usage = []

  var days = []
  var day = []

  // group all data by day
  data.forEach(function(datum) {
    if(datum.x < cutoff) {
      // ignore anything older than graph:maxAgeInDays
      return
    }

    // record date so we can easily compare days
    datum.date = new Date(datum.x)

    if(day[day.length - 1] && day[day.length - 1].date.getDate() != datum.date.getDate()) {
      days.push(day)
      day = []
    } else {
      day.push(datum)
    }
  });

  // all datapoints were in one day..
  if(days.length == 0) {
    days.push(day)
  }

  // compress each days worth of data
  days.forEach(function(day) {
    var compressed = this._compressDay(day, now, datapoints, distribution)

    usage = usage.concat(compressed)
  }.bind(this))

  return usage
}

ProcessData.prototype._compressDay = function(day, now, datapoints, distribution) {
  if(day.length == 0) {
    return day
  }

  var dayDifference = Math.floor((now - day[day.length - 1].x) / MILLISECONDS_IN_A_DAY)

  if(dayDifference > distribution.length) {
    return []
  }

  var percent = distribution[dayDifference]

  return this._compress(day, (datapoints/100) * percent)
}

ProcessData.prototype._compress = function(dataSet, maxSamples) {
  var sampleSize = Math.ceil(dataSet.length/maxSamples)

  var output = []
  var offset = 1
  var data = 0
  var date = 0

  // don't merge the first result
  output.push(dataSet[0])

  if(maxSamples > 2) {
    while(offset < (dataSet.length - 1)) {
      var processed = 0

      for(var i = 0; i < sampleSize; i++) {
        if(offset + i == dataSet.length) {
          break
        }

        // might at some point overflow MAX_INT here. won't that be fun.
        date += dataSet[offset + i].x
        data += dataSet[offset + i].y

        processed++
      }

      offset += processed

      output.push({
        x: date / processed,
        y: data / processed
      })

      data = 0
      date = 0
    }
  }

  // don't merge the last result
  output.push(dataSet[dataSet.length - 1])

  return output
}

module.exports = ProcessData
