var commander = require('commander'),
  pkg = require('./package.json'),
  path = require('path'),
  prompt = require('prompt'),
  bcrypt = require('bcrypt'),
  Configuration = require('./server/components/Configuration')

colors = require('colors')

var CLI = function() {

}

CLI.prototype._withConfiguration = function(callback) {
  var config = new Configuration()

  callback(config, function(error) {
    if(error) {
      return console.error(error.message.red)
    }

    config.save()
  })
}

CLI.prototype.generateSalt = function() {
  this._withConfiguration(function(config, done) {
    if(config.salt && Object.keys(config.users).length != 0) {
      console.warn('Passwords for all users will need to be reset!')
    }

    this._generateSalt(config)

    done()
  }.bind(this))
}

CLI.prototype._generateSalt = function(config) {
  config.salt = bcrypt.genSaltSync()
}

CLI.prototype.addUser = function(userName) {
  this._withConfiguration(function(config, done) {
    console.info(config)

    if(!config.salt) {
      console.info('no salt!')
      this._generateSalt(config)
    }

    if(config.users[userName]) {
      console.info('already user!')
      return done(new Error('A user with the name ' + userName +  ' already exists'))
    }

    this._getUserPassword(config, function(error, password) {
      config.users[userName] = {
        password: password
      }

      done(error)
    })
  }.bind(this))
}

CLI.prototype.removeUser = function(userName) {
  this._withConfiguration(function(config, done) {
    delete config.users[userName]

    done()
  }.bind(this))
}

CLI.prototype.changeUserPassword = function(userName) {
  this._withConfiguration(function(config, done) {
    if(!config.salt) {
      this._generateSalt(config)
    }

    if(!config.users[userName]) {
      return done(new Error('No user with the name ' + userName +  'exists'))
    }

    this._getUserPassword(config, function(error, password) {
      config.users[userName].password = password

      done(error)
    })
  }.bind(this))
}

CLI.prototype.listUsers = function() {
  this._withConfiguration(function(config, done) {
    var userNames = Object.keys(config.users)

    if(userNames.length == 0) {
      console.info('No users')
    } else {
      userNames.forEach(function(userName) {
        console.info(userName)
      })
    }

    done()
  }.bind(this))
}

CLI.prototype._getUserPassword = function(config, callback) {
  prompt.message = ''
  prompt.start()
  prompt.get([{
    name: 'Enter a password (no characters will appear)',
    required: true,
    hidden: true
  }, {
    name: 'Repeat the password',
    required: true,
    hidden: true,
    message: 'Passwords must match',
    conform: function (value) {
      return value == prompt.history('Enter a password (no characters will appear)').value;
    }
  }], function (error, result) {
    var password

    if(!error) {
      password = result['Enter a password (no characters will appear)']
      password = bcrypt.hashSync(password, config.salt)
    }

    callback(error, password)
  }.bind(this))
}

var cli = new CLI()

commander
  .version(pkg.version)

commander
  .command('gensalt')
  .description('Generates a random salt to use for user password')
  .action(cli.generateSalt.bind(cli))

commander
  .command('useradd <username>')
  .description('Adds a web user')
  .action(cli.addUser.bind(cli))

commander
  .command('rmuser <username>')
  .description('Removes a web user')
  .action(cli.removeUser.bind(cli))

commander
  .command('passwd <username>')
  .description('Sets the password for a web user')
  .action(cli.changeUserPassword.bind(cli))

commander
  .command('userlist')
  .description('Prints out a list of users')
  .action(cli.listUsers.bind(cli))

var program = commander.parse(process.argv)

// No command, start the webserver
if(program.args.length == 0) {
  var Server = require('./server')

  new Server()
}
