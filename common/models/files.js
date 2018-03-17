'use strict';

var LoopBackContext = require('loopback-context')

module.exports = function(Files) {
  Files.addFiles = (name, content, options, cb) => {
    Files.create({name, content, userId: options.accessToken.userId})
    .then(file => {
      cb(null, file)
    })
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }
  Files.remoteMethod(
    'addFiles', {
      http: {
        path: '/',
        verb: 'post'
      },
      accepts: [{
        arg: 'name',
        type: 'string'
      }, {
          arg: 'content',
          type: 'string'
      }, {
        "arg": "options",
        "type": "object",
        "http": "optionsFromRequest"
      }
    ],
      returns: {
          type: 'object',
          root: true
      }
    }
  )

  Files.getFilesByUserId = (options, cb) => {
    Files.find({userId: options.accessToken.userId})
    .then(files => cb(null, files))
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }

  Files.remoteMethod(
    'getFilesByUserId', {
      http: {
        path: '/',
        verb: 'get'
      },
      accepts: [{
        "arg": "options",
        "type": "object",
        "http": "optionsFromRequest"
      }],
      returns: {
        type: 'object',
        root: true
      }
    }
  )

  Files.getFileById = (id, cb) => {
    Files.find({"where": { id }})
    .then(file => cb(null, file))
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }
  Files.remoteMethod(
    'getFileById', {
      http: {
        path: '/:id',
        verb: 'get'
      },
      accepts: {
        "arg": "id",
        "type": 'string'
      },
      returns: {
        type: 'object',
        root: true
      }
    }
  )
};
