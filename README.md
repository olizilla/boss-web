# boss-web

A web interface for the [boss](http://github.com/tableflip/boss) process manager.

## Prerequisites

 1. Boss installed on one or more servers
 2. A modern web browser

## Installation

```sh
$ npm install -g boss-web
``

## Setup



All users are authenticated with a secret and a pre-shared AES key.  To set up a user to connect to boss remotely, on the machine boss is running on, run the following (where `$USER` is the username you wish to add):

```sh
# bs remote useradd $USER
```

You will then be prompted to enter a password for that user
