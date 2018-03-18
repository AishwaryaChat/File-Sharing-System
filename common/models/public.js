'use strict';

module.exports = function(PublicModel) {
  PublicModel.getFile = (fileId, userId, cb) => {
    const Files = PublicModel.app.models.files
    const Users = PublicModel.app.models.User
    Users.findById(userId)
    .then(user => {
      if (user) return Files.findById(fileId)
      else return Promise.reject('error.not a valid url')
    })
    .then(file => {
      console.log(file)
      cb(null, file)
    })
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }
  PublicModel.remoteMethod(
    'getFile',{
      http: {
        path: '/file/:fileId/user/:userId',
        verb: 'get'
      },
      accepts: [{
        arg: 'fileId',
        type: 'string'
      }, {
          arg: 'userId',
          type: 'string'
      }],
      returns: {
          type: 'object',
          root: true
      }
    }
  )

  PublicModel.editFile = (fileId, name, content, userId, cb) => {
    const Files = PublicModel.app.models.files
    const Users = PublicModel.app.models.User
    Users.findById(userId)
    .then(user => {
      if (user) return Files.findById(fileId)
      else return Promise.reject('error.not a valid url')
    })
    .then(file => {
      if (file) {
        file = Object.assign(file, {name, content})
        return file.save()
      }
    })
    .then(file => cb(null, file))
    .catch(err => {
      console.log(err)
      cb(err)
    })
  }
  PublicModel.remoteMethod(
    'editFile',{
      http: {
        path: '/file/:fileId/user/:userId',
        verb: 'patch'
      },
      accepts: [{
        arg: 'fileId',
        type: 'string'
      }, {
        arg: 'name',
        type: 'string'
      }, {
        arg: 'content',
        type: 'string'
      },
      {
          arg: 'userId',
          type: 'string'
      }],
      returns: {
          type: 'object',
          root: true
      }
    }
  )
};
