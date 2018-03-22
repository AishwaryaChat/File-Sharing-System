import { checkStatus, parseJSON } from '../helpers/utils'
import { SET_LOGIN, APP_LOGOUT, SET_REGISTERED } from '../helpers/actions'

const emitLogin = data => ({
  type: SET_LOGIN,
  data: data
})

export const emitLogout = () => ({
  type: APP_LOGOUT
})

const emitRegistered = () => ({
  type: SET_REGISTERED
})

const postLogin = ({email, password}) => {
  const url = process.env.REACT_APP_SERVER + '/api/Users/login'
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export const startPostLogin = data => dispatch => {
  return postLogin(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside login', json)
      dispatch(
        emitLogin(json)
      )
    })
    .catch(err => {
      console.error(err)
    })
}

const logout = ({ jwt }) => {
  const url = process.env.REACT_APP_SERVER + '/api/Users/logout/?access_token=' + jwt
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}

export const startLogout = data => dispatch => {
  return logout(data)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => {
      console.log(err)
      return {}
    })
    .then(json => {
      console.log('data inside logout', json)
      dispatch(emitLogout())
    })
    .catch(err => {
      console.error(err)
    })
}

const postRegister = ({email, password}) => {
  const url = process.env.REACT_APP_SERVER + '/api/Users'
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export const startPostRegister = data => dispatch => {
  return postRegister(data)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('data inside register', json)
      dispatch(emitRegistered())
    })
    .catch(err => {
      console.error(err)
    })
}
