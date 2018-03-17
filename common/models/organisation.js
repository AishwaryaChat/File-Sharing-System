'use strict';

module.exports = function(Organisation) {
  Organisation.createOrganisation = (name, options, cb) => {
    Organisation.findOne({admin: options.accessToken.userId})
    .then(organisation => {
      if (organisation) return Promise.reject('error.organisation already exist')
      return Organisation.create({name, admin: options.accessToken.userId})
    })
    .then(organisation => cb(null, organisation))
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }
  Organisation.getOrganisation = (options, cb) => {
    Organisation.findOne({admin: options.accessToken.userId})
    .then(organisation => {
      if (!organisation) cb(null, {})
      else cb(null, organisation)
    })
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }

  Organisation.remoteMethod(
    'createOrganisation', {
      http: {
        path: '/',
        verb: 'post'
      },
      accepts: [
        {
          arg: 'name',
          type: 'string'
        },
        {
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

  Organisation.remoteMethod(
    'getOrganisation', {
      http: {
        path: '/',
        verb: 'get'
      },
      accepts: {
        "arg": "options",
        "type": "object",
        "http": "optionsFromRequest"
      },
      returns: {
        type: 'object',
        root: true
      }
    }
  )
};
