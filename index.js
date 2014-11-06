var commander = require('commander'),
  pkg = require('./package.json'),
  path = require('path'),
  prompt = require('prompt'),
  bcrypt = require('bcrypt')

colors = require('colors')

var CLI = function() {

}

CLI.prototype.generateSalt = function() {
  var salt = bcrypt.genSaltSync()
  console.error('Please update the bossweb config file with:')
  console.error('')
  console.error('salt = %s'.cyan, salt)
}

CLI.prototype.generateUserPassword = function(userName) {
  var config = require('./server/config')

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
  }], function (err, result) {
    var password = result['Enter a password (no characters will appear)'];

    console.info('')
    console.info('Update your bossweb-users file with the following:')
    console.info('')
    console.info('[%s]'.cyan, userName)
    console.info('  password = %s'.cyan, bcrypt.hashSync(password, config.salt))
    console.info('')
  }.bind(this))
}

var cli = new CLI()

commander
  .version(pkg.version)

commander
  .command('gensalt')
  .description('Prints out config to add to bossweb to salt password hashes')
  .action(cli.generateSalt.bind(cli))

commander
  .command('passwd <username>')
  .description('Prints out config to add to bossweb-users to allow a user to authenticate')
  .action(cli.generateUserPassword.bind(cli))

var program = commander.parse(process.argv)

// No command, start the webserver
if(program.args.length == 0) {
  var Server = require('./server')

  new Server()
}
