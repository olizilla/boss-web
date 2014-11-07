var expect = require('chai').expect,
  sinon = require('sinon'),
  path = require('path'),
  proxyquire = require('proxyquire')

var stubs = {
  //rc: sinon.stub(),
  fs: {

  }
}
var Configuration

describe('Configuration', function() {
  var config

  beforeEach(function() {
    Configuration = proxyquire('../../../server/components/Configuration', stubs)
  })

  it('should save changed properties', function() {
    config = new Configuration()
    config.salt = 10

    config.users['alex'] = {password: 'foo'}

    config._writeConfigFile = sinon.stub()

    config.save()

    expect(config._writeConfigFile.getCall(0).args[0]).to.deep.equal({salt: 10})
    expect(config._writeConfigFile.getCall(1).args[0]).to.deep.equal({
      alex: {
        password: 'foo'
      }
    })
  })
})
