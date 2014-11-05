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

There are three configuration files of interest `bossweb-hosts`, `bossweb-users` and `bossweb`.  The first declares which hosts to monitor, the second contains user credentials for those hosts and the third contains config options for boss-web itself.

Configuration files should be placed at one of:

 * `$HOME/.boss/bossweb`
 * `$HOME/.config/boss/bossweb`
 * `/etc/boss/bossweb`
 * ..etc

The config files contain sensitive information so should have appropriate permissions applied to them. E.g. `0600` for the user boss-web runs as.

### bossweb-hostsrc

To add hosts, run the `remotehostconfig` subcommand on the boss server you wish to monitor:

```sh
$ bs remoteconfig

Add the following to your bossweb-hosts file:

[foo-bar-com]
  host = foo.bar.com
  port = 57483
  user = root
  key = U/ZektHdrp....
  secret = ZD57XFx6sBz....
```

Copy this into your `bossweb-hostsrc` file and repeat for any other servers you wish to monitor.

Two things to notice:

 1. The host running boss must be reachable from the host running boss-web via the `host` property above. If it isn't, replace the value.
 2. If you don't like `foo-bar-com` invoke `remotehostconfig` with an argument or update it in the config file

### bossweb-usersrc

All users are authenticated with a secret and a pre-shared AES key.  To enable a user named `alex` to connect to boss remotely, on the machine boss is running on, run the following:

```sh
$ bs adduser alex

Add the following to your bossweb-usersrc file:

[alex.foo-bar-com]
  key = dr++xTd...
  secret = VrC+BEx6...


If alex is not in your config file yet, also add this above the previous block:

[alex]
  password = correcthorsebatterystaple
```

You can remove users with the following:

```sh
$ bs rmuser alex
```

A users key/secret can be reset with the following

```
$ bs reset alex

Update your bossweb-usersrc file with the following:

[alex.Alexs-MBP-home]
  key = vHmtPvoV...
  secret = hzXGFYzp...
```

### bossweb

Most settings here are best left to the defaults except:

```
[http]
  ; Which host to accept connections on
  listen = 0.0.0.0

  ; Which port to accept connections on
  port = 3000

[https]
  ; If you are performing SSL termination somewhere else set this to false to
  ; stop boss-web from starting an https server, otherwise leave this enabled!
  enabled = true

  ; Which host to accept connections on
  listen = 0.0.0.0

  ; Which port to accept connections on
  port = 3001

  ; Uncomment to provide a path to the secure key for this server
  ; If left commented a temporary key will be generated on startup
  ; key = /path/to/key

  ; Uncomment to provide a path to the certificate for this server
  ; If left commented a temporary certificate will be generated on startup
  ; cert = /path/to/cert

  ; if true, start an http server on ${http.port} and redirect users to the
  ; server running on ${https.port}
  upgrade = true
```
