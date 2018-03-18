'use strict';

const underscore = require('underscore')
const ObjectId = require('mongodb').ObjectId

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

  Organisation.addFile = (id, fileId, cb) => {
    const Files = Organisation.app.models.files
    Files.findOne({"where": {_id: fileId}})
    .then(file => {
      if (file) return Organisation.findOne({"where": {_id: id}})
      else return Promise.reject('error.invalid file id')
    })
    .then(organisation => {
      if (organisation) {
        let files = []
        if (organisation.files) {
          files = underscore.uniq(organisation.files.concat(new ObjectId(fileId)))
        } else files = [new ObjectId(fileId)]
        organisation = Object.assign(organisation, {files})
        return organisation.save()
      }
      return Promise.reject('error.no organisation exist')
    })
    .then(organisation => cb(null, organisation))
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }

  Organisation.remoteMethod(
    'addFile', {
      http: {
        path: '/:id/addfile',
        verb: 'patch'
      },
      accepts: [{
        "arg": 'id',
        'type': 'string'
      },
      {
        "arg": 'fileId',
        'type': 'string'
      }],
      returns: {
        type: 'object',
        root: true
      }
    }
  )
};
