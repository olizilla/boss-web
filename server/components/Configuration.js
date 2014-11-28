require('colors')

var rc = require('boss-rc'),
  path = require('path'),
  ini = require('ini'),
  fs = require('fs'),
  coerce = require('coercer'),
  Autowire = require('wantsit').Autowire

Configuration = function() {
  // load defaults
  var defaults = coerce(ini.parse(fs.readFileSync(path.resolve(__dirname + '/../../bossweb'), 'utf-8')))
  var clientDefaults = coerce(ini.parse(fs.readFileSync(path.resolve(__dirname + '/../../bossweb-client'), 'utf-8')))

  // load user overrides
  var userConfig = coerce(rc('boss/bossweb', defaults, {}))
  var userClientConfig = coerce(rc('boss/bossweb-client', clientDefaults, {}))

  // load users and user/host config
  var userUsersConfig = coerce(rc('boss/bossweb-users', {}, {}))
  var userHostsConfig = coerce(rc('boss/bossweb-hosts', {}, {}))

  this.client = {
    debugMode: process.env.NODE_ENV == 'development'
  }

  // copy all properties to this
  this._copy(userConfig, this)
  this._copy(userClientConfig, this.client)
  this.hosts = userHostsConfig
  this.users = userUsersConfig

  this.client.minVersion = this.minVersion

  this._posix = Autowire
}

Configuration.prototype._copy = function(source, dest) {
  for(var key in source) {
    if(key == '_') {
      continue
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function(source, key) {
        return source[key]
      }.bind(this, source, key),
      set: function(source, key, value) {
        source[key] = value
      }.bind(this, source, key)
    })
  }
}

Configuration.prototype.afterPropertiesSet = function() {
  this._checkLength(this.hosts, 'Could not read any remote hosts from the configuration file.', 'bossweb-hosts')
  this._checkLength(this.users, 'Could not read any users from the configuration file.', 'bossweb-users')

  if(!this.salt) {
    console.error('No password salt was found in the bossweb config file!'.red)
    console.error('Please run'.red, 'bs-web gensalt', 'and follow the instructions'.red)

    process.exit(1)
  }

  Object.keys(this.users).forEach(function(userName) {
    for(var key in this.users[userName]) {
      if(key == 'password') {
        continue
      }

      if(!this.hosts[key]) {
        console.error('User \'%s\' has config set for host \'%s\' but no such host exists in bossweb-hosts - please fix your configuration'.red, userName, key)
        process.exit(1)
      }
    }
  }.bind(this))
}

Configuration.prototype._checkLength = function(obj, message, file) {
  if(Object.keys(obj).length == 0) {
    this._emitConfigFileError(message, file)

    process.exit(1)
  }
}

Configuration.prototype._emitConfigFileError = function(message, file) {
  var user = this._posix.getpwnam(process.getuid())
  var path = user.username == 'root' ? '/etc/boss/' + file : user.dir + '/.config/boss/' + file

  console.error(message.red)
  console.error('Either the configuration file was empty or you defined it in the wrong place.'.red)
  console.error('It should be at'.red, path)
  console.error('Please follow the setup instructions in the README'.red)
}

module.exports = Configuration
