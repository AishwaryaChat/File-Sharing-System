import { checkStatus, parseJSON } from '../helpers/utils'
import { SET_FILES, SET_FILE } from '../helpers/actions'

const emitSetFiles = data => {
  const byId = {}
  let allIds = []
  if (data) {
    data.forEach(file => {
      byId[file.id] = file
      allIds = allIds.concat(file.id)
    })
  }
  return {
    type: SET_FILES,
    byId,
    allIds
  }
}

export const emitFile = id => ({
  type: SET_FILE,
  id
})

const postFile = ({name, content, jwt}) => {
  const url = process.env.REACT_APP_SERVER + '/api/files?access_token=' + jwt
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, content })
  })
}

export const startPostFile = (data, cb) => dispatch => {
  return postFile(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside post file', json)
      cb()
    })
    .catch(err => {
      console.error(err)
    })
}

const fetchFiles = ({ jwt }) => {
  const url = process.env.REACT_APP_SERVER + '/api/files/?access_token=' + jwt
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const startFetchFiles = data => dispatch => {
  return fetchFiles(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside fetch files', json)
      dispatch(emitSetFiles(json))
    })
    .catch(err => {
      console.error(err)
    })
}

const fetchFile = ({id, jwt}) => {
  const url = process.env.REACT_APP_SERVER + '/api/files/file?access_token=' + jwt
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const startFetchFile = data => dispatch => {
  return fetchFile(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside fetch files', json)
      dispatch(emitSetFiles(json))
    })
    .catch(err => {
      console.error(err)
    })
}

const patchFile = ({id, name, content, jwt}) => {
  const url = process.env.REACT_APP_SERVER + '/api/files/' + id + '/?access_token=' + jwt
  return fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, content })
  })
}

export const startPatchFile = (data, cb) => dispatch => {
  return patchFile(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside patch file', json)
      cb()
    })
    .catch(err => {
      console.error(err)
    })
}
