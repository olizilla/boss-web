var rc = require('rc'),
  path = require('path'),
  clientConfig = coerce(stripUnderscores(rc('boss/bossweb-client', path.resolve(__dirname + '/../bossweb-client')))),
  hostConfig = coerce(checkLength(stripUnderscores(rc('boss/bossweb-hosts')), 'Please define some host names')),
  userConfig = coerce(checkLength(stripUnderscores(rc('boss/bossweb-users')), 'Please define some users')),
  config = coerce(stripUnderscores(rc('boss/bossweb', path.resolve(__dirname + '/../bossweb'))))

require('colors')

function coerce(obj) {
  if(Array.isArray(obj)) {
    return obj.map(function(value) {
      return coerce(value)
    })
  }

  if(obj instanceof String || typeof obj == 'string') {
    if(obj == 'false') {
      return false
    }

    if(obj == 'true') {
      return true
    }

    if(isFinite(obj)) {
      return parseFloat(obj)
    }

    return obj
  }

  if(obj === true || obj === false) {
    return obj
  }

  for(var key in obj) {
    obj[key] = coerce(obj[key])
  }

  return obj
}

function stripUnderscores(obj) {
  for(var key in obj) {
    if(key == '_') {
      delete obj[key]
    }
  }

  return obj
}

function checkLength(obj, message) {
  if(Object.keys(obj).length == 0) {
    console.error(message.red)
    process.exit(1)
  }

  return obj
}

Object.keys(userConfig).forEach(function(userName) {
  for(var key in userConfig[userName]) {
    if(key == 'password') {
      continue
    }

    if(!hostConfig[key]) {
      console.error('User \'%s\' has config set for host \'%s\' but no such host exists in bossweb-hosts - please fix your configuration'.red, userName, key)
      process.exit(1)
    }
  }
})

config.client = clientConfig
config.hosts = hostConfig
config.users = userConfig

if(!config.salt) {
  console.error('No password salt was found in the bossweb config file!'.red)
  console.error('Please run'.red, 'bs-web gensalt', 'and follow the instructions'.red)

  process.exit(1)
}
module.exports = config
