# boss-web

A web interface for the [boss](http://github.com/tableflip/boss) process manager.

## Prerequisites

 1. Boss installed on one or more servers
 2. A modern web browser

## Installation

```sh
$ npm install -g boss-web
```

## Setup

There are three configuration files of interest `bossweb`, `bossweb-hosts` and `bossweb-users`.

Depending on who is running boss-web, configuration files should be placed at one of:

 * Normal user - `$HOME/.boss/bossweb` or `$HOME/.config/boss/bossweb`
 * Root user - `/etc/boss/bossweb`

The config files contain sensitive information so should have appropriate permissions applied to them, i.e. `0600`.

### bossweb

`bossweb` contains various preferences and settings for the web server and user interface.

The first thing to do is to generate a salt for user passwords:

```
$ bs-web gensalt
Please update the bossweb config file with:

salt = $2a$10$wg...
```

Take the `salt = $2a$10$wg...` part and add it to the top of `bossweb`  e.g:

```
salt = $2a$10$wg...

[http]
  port = 80
  ... more settings here
```

See the [default configuration file](./bossweb) for discussion on the various options.

Anything you specify in your configuration file will override the defaults.

### bossweb-hostsrc

This file contains the hosts you wish to monitor.

To configure a host, run the `remoteconfig` subcommand on the boss server you wish to monitor:

```sh
$ sudo bs remoteconfig

Add the following to your bossweb-hosts file:

[foo-bar-com]
  host = foo.bar.com
  port = 57483
  user = root
  secret = ZD57XFx6sBz....
```

Copy this into your `bossweb-hostsrc` file and repeat for any other servers you wish to monitor.

### bossweb-usersrc

All users are authenticated with a secret and a pre-shared AES key.  To enable a user named `alex` to connect to boss remotely, on the machine boss is running on, run the following:

```sh
$ sudo bs useradd alex

Add the following to your bossweb-users file:

[alex.foo-bar-com]
  secret = LsYd5UaH...

If alex is not in your config file yet, run `bs-web passwd alex` to generate the appropriate configuration
```

You can remove users with the following:

```sh
$ sudo bs rmuser alex
```

A users key/secret can be reset with the following

```
$ sudo bs reset alex

Update your bossweb-users file with the following:

[alex.foo-bar-com]
  secret = DJnnqA1...
```

Once a user has been created with boss, you need to create the user for boss-web as well. This should be done on the machine that boss-web will run on.

```
$ bs-web passwd alex
: Enter a password (no characters will appear):  
: Repeat the password:  

Update your bossweb-users file with the following:

[alex]
  password = $2a$10$Y0...
```
