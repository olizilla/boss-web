var ProcessData = require(__dirname + "/../../../server/domain/ProcessData"),
  sinon = require("sinon"),
  expect = require("chai").expect

describe('ProcessData', function() {
  var data

  beforeEach(function() {
    data = new ProcessData({
      "id": 0, "pid": 0, "name": "", "script": "", "uptime": 0, "restarts": 0, "status": "", "memory": 0, "cpu": 0
    })
    data._config = {}
    data._processDataFactory = {}
  })

  it("should compress lots of data", function() {
    data._config.graph = {
      datapoints: 1000,
      distribution: [45, 25, 15, 10, 5]
    }

    // create a week's worth of data
    var secondsInAWeek = 604800
    var samples = secondsInAWeek / 5
    var now = Date.now()

    for (var i = 0; i < samples; i++) {
      now -= 5000

      data.heapTotal.push({
        x: now,
        y: 5
      })
    }

    expect(data.heapTotal.length).to.equal(samples)

    data._append(5, 5, 5, 5, Date.now())

    expect(data.heapTotal.length).to.be.above(0)
    expect(data.heapTotal.length).to.not.be.above(1000)
  })

  it("should compress", function() {
    var expectedLength = 2

    var input = [{
      x: new Date("2010-11-10 12:00:00").getTime(),
      y: 1
    }, {
      x: new Date("2010-11-10 12:00:05").getTime(),
      y: 1.1
    }, {
      x: new Date("2010-11-10 12:00:10").getTime(),
      y: 1.2
    }, {
      x: new Date("2010-11-10 12:00:15").getTime(),
      y: 1.2
    }]

    var result = data._compress(input, 2)

    expect(result.length).to.equal(expectedLength)

    // start and end times should be constant
    expect(result[0].x).to.equal(input[0].x)
    expect(result[result.length - 1].x).to.equal(input[input.length - 1].x)
  })

  it("should accept existing log data", function() {
    expect(data.logs.length).to.equal(0)

    data = new ProcessData({
      "id": 0, "pid": 0, "name": "", "script": "", "uptime": 0, "restarts": 0, "status": "", "memory": 0, "cpu": 0,
      "logs": [{
        type: "foo",
        date: Date.now(),
        message: "bar"
      }]
    })
    data._config.logs = {
      max: 100
    }
    data.afterPropertiesSet()

    expect(data.logs.length).to.equal(1)
    expect(data.logs[0].type).to.equal("foo")
    expect(data.logs[0].message).to.equal("bar")
  })

  it("should not overflow log limit", function() {
    data.logs.length = 100
    expect(data.logs.length).to.equal(100)

    data._config.logs = {
      max: 100
    }

    data.log("foo", Date.now(), "bar")

    // should not have increased overall length
    expect(data.logs.length).to.equal(100)

    // should have appended log
    expect(data.logs[99].type).to.equal("foo")
    expect(data.logs[99].message).to.equal("bar")
  })

  it("should merge datapoints if value is the same", function() {
    var array = []

    data._appendIfDifferent(array, 1, 5)
    data._appendIfDifferent(array, 1, 6)
    data._appendIfDifferent(array, 1, 7)

    expect(array.length).to.equal(2)
    expect(array[0].x).to.equal(5)
    expect(array[0].y).to.equal(1)
    expect(array[1].x).to.equal(7)
    expect(array[1].y).to.equal(1)
  })
})
