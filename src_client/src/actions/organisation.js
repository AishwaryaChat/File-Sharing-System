import { checkStatus, parseJSON } from '../helpers/utils'
import { SET_ORGANISATION, SET_ORGANISATION_FILES } from '../helpers/actions'

const emitOrganisation = (data) => ({
  type: SET_ORGANISATION,
  organisation: data
})

const emitFiles = (data) => {
  const filesById = {}
  if (data) {
    data.forEach(file => {
      filesById[file.id] = file
    })
  }
  return ({
    type: SET_ORGANISATION_FILES,
    filesById
  })
}

const postOrganisation = ({name, jwt}) => {
  const url = process.env.REACT_APP_SERVER + '/api/organisations/?access_token=' + jwt
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
}

export const startPostOrganisation = (data, cb) => dispatch => {
  return postOrganisation(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside create organisation', json)
      dispatch(emitOrganisation(json))
      cb()
    })
    .catch(err => {
      console.error(err)
    })
}

const fetchOrganisation = ({jwt}) => {
  const url = process.env.REACT_APP_SERVER + '/api/organisations/?access_token=' + jwt
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const startFetchOrganisation = (data) => dispatch => {
  return fetchOrganisation(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside fetch organisation', json)
      dispatch(emitOrganisation(json))
    })
    .catch(err => {
      console.error(err)
    })
}

const addFile = ({id, fileId, jwt}) => {
  const url = process.env.REACT_APP_SERVER + '/api/organisations/' + id + '/addFile/?access_token=' + jwt
  return fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, fileId })
  })
}

export const startAddFile = (data) => dispatch => {
  return addFile(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside add file organisation', json)
      dispatch(emitOrganisation(json))
    })
    .catch(err => {
      console.error(err)
    })
}

const fetchFiles = ({id, jwt}) => {
  const url = process.env.REACT_APP_SERVER + '/api/files/' + encodeURIComponent(JSON.stringify(id)) + '/?access_token=' + jwt
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const startFetchFiles = (data) => dispatch => {
  return fetchFiles(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside fetch files organisation', json)
      dispatch(emitFiles(json))
    })
    .catch(err => {
      console.error(err)
    })
}
