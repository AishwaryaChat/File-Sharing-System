'use strict';

var LoopBackContext = require('loopback-context')

module.exports = function(Files) {
  Files.addFiles = (name, content, userId, cb) => {
    Files.create({name, content, userId})
    .then(file => {
      cb(null, file)
    })
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }
  Files.getFilesByUserId = (userId, cb) => {
    Files.find({userId})
    .then(files => cb(null, files))
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
          arg: 'userId',
          type: 'string'
      }
    ],
      returns: {
          type: 'object',
          root: true
      }
    }
  )
  Files.remoteMethod(
    'getFilesByUserId', {
      http: {
        path: '/userId/:userId',
        verb: 'get'
      },
      accepts: {
        arg: 'userId',
        type: 'string'
      },
      returns: {
        type: 'object',
        root: true
      }
    }
  )
};
