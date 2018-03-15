'use strict';

var LoopBackContext = require('loopback-context')

module.exports = function(Files) {
  Files.addOrganisation = (name, content, userId, cb) => {
    Files.create({name, content, userId})
    .then(file => {
      cb(null, file)
    })
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }
  Files.remoteMethod(
    'addOrganisation', {
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
          arg: 'data',
          type: 'string'
      }
    }
  )

};
