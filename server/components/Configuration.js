require('colors')

var rc = require('rc'),
  path = require('path'),
  ini = require('ini'),
  fs = require('fs'),
  coerce = require('coercer'),
  Changeable = require('./Changeable'),
  copy = require('copy-to')

Configuration = function() {
  // load defaults
  var defaults = coerce(ini.parse(fs.readFileSync(path.resolve(__dirname + '/../../bossweb'), 'utf-8')))
  var clientDefaults = coerce(ini.parse(fs.readFileSync(path.resolve(__dirname + '/../../bossweb-client'), 'utf-8')))

  // load user overrides
  var userConfig = coerce(rc('boss/bossweb', defaults, {}))
  var userClientConfig = coerce(rc('boss/bossweb-client', clientDefaults, {}))

  // track changes on user overrides
  var config = new Changeable(userConfig)
  var clientConfig = new Changeable(userClientConfig)

  // apply user overrides to config
  copy(userConfig).to(config)
  copy(userClientConfig).to(clientConfig)

  // load users user/host config
  var userUsersConfig = coerce(rc('boss/bossweb-users', {}, {}))
  var userHostsConfig = coerce(rc('boss/bossweb-hosts', {}, {}))

  this.client = {}

  // copy all properties to this
  this._copy(config, this)
  this._copy(clientConfig, this.client)
  this.hosts = userHostsConfig
  this.users = userUsersConfig

  // make original config and rc files available via non-enumerables
  Object.defineProperties(this, {
    _config: {
      value: config
    },
    _clientConfig: {
      value: clientConfig
    },
    _configrc: {
      value: userConfig
    },
    _clientConfigrc: {
      value: userClientConfig
    },
    _usersConfigrc: {
      value: userUsersConfig
    },
    _hostsConfigrc: {
      value: userHostsConfig
    },
    _initialUsersConfig: {
      value: JSON.stringify(this.users)
    },
    _initialHostsConfig: {
      value: JSON.stringify(this.hosts)
    }
  })
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

Configuration.prototype.rcfiles = function(type) {
  if(!type) {
    return this._configrc._rcfiles
  }

  if(type == 'users') {
    return this._usersConfigrc._rcfiles
  }

  if(type == 'hosts') {
    return this._hostsConfigrc._rcfiles
  }

  if(type == 'client') {
    return this._clientConfigrc._rcfiles
  }
}

Configuration.prototype.afterPropertiesSet = function() {
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

  this._checkLength(this.hosts, 'Please define some host names')
  this._checkLength(this.users, 'Please define some users')

  if(!this.salt) {
    console.error('No password salt was found in the bossweb config file!'.red)
    console.error('Please run'.red, 'bs-web gensalt', 'and follow the instructions'.red)

    process.exit(1)
  }
}

Configuration.prototype.save = function() {
  if(Object.keys(this._config.changed).length > 0) {
    console.info('changed', this._config.changed)
    this._writeConfigFile(this._config.changed)
  }

  if(Object.keys(this._clientConfig.changed).length > 0) {
    this._writeConfigFile(this._clientConfig.changed, 'client')
  }

  if(JSON.stringify(this.users) != this._initialUsersConfig) {
    this._writeConfigFile(this.users, 'users')
  }

  if(JSON.stringify(this.hosts) != this._initialHostsConfig) {
    this._writeConfigFile(this.hosts, 'hosts')
  }
}

Configuration.prototype._writeConfigFile = function(obj, section) {
  var configFile = 'bossweb' + (section ? '-' + section : '')
  var rcfiles = this.rcfiles(section)

  if(rcfiles.length > 0) {
    // loaded a user defined file
    fs.writeFileSync(rcfiles[0], ini.stringify(obj))

    console.info('Updated config file at', rcfiles[0])
  } else {
    // try to write files
    try {
      var target = '/etc/boss'

      if(!fs.existsSync(target)) {
        fs.mkdirSync(target, 0700)
      }

      target += '/' + configFile

      fs.writeFileSync(target, ini.stringify(obj), {
        mode: 0600
      })

      console.info('Wrote config file to', target)
    } catch(error) {
      if(error.code == 'EACCES') {
        // not a privileged user, write out config in user home directory
      }

      var target = process.env.HOME + '/.config'

      if(!fs.existsSync(target)) {
        fs.mkdirSync(target, 0755)
      }

      target += '/boss'

      if(!fs.existsSync(target)) {
        fs.mkdirSync(target, 0700)
      }

      target += '/' + configFile

      fs.writeFileSync(target, ini.stringify(obj), {
        mode: 0600
      })

      console.info('Wrote config file to', target)
    }
  }
}

Configuration.prototype._checkLength = function(obj, message) {
  if(Object.keys(obj).length == 0) {
    console.error(message.red)
    process.exit(1)
  }

  return obj
}

module.exports = Configuration
