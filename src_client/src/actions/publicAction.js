import { checkStatus, parseJSON } from '../helpers/utils'
import { SET_PUBLIC_FILE } from '../helpers/actions'

export const emitFile = file => ({
  type: SET_PUBLIC_FILE,
  file
})

const fetchPublicFile = ({ fileId, userId }) => {
  const url = process.env.REACT_APP_SERVER + `/api/PublicModels/file/${fileId}/user/${userId}`
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const startFetchPublicFile = data => dispatch => {
  return fetchPublicFile(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside fetch public file', json)
      dispatch(emitFile(json))
    })
    .catch(err => {
      console.error(err)
    })
}

const patchPublicFile = ({ fileId, name, content, userId }) => {
  const url = process.env.REACT_APP_SERVER + `/api/PublicModels/file/${fileId}/user/${userId}`
  return fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, content })
  })
}

export const startPatchPublicFile = data => dispatch => {
  return patchPublicFile(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside patch public file', json)
      dispatch(emitFile(json))
    })
    .catch(err => {
      console.error(err)
    })
}
