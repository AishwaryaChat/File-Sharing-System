/* Custom Errors */

import customError from 'custom-error'

export const AuthError = customError('AuthError')

export const checkStatus = response => {
  console.log('response.status', response.status)
  if (response.status >= 200 && response.status < 300) return response

  if (response.status === 401 && response.statusText !== '') {
    let error = new AuthError()
    error.message = response.statusText
    throw error
  } else {
    let error = new Error()
    error.message = response.statusText
    throw error
  }
}

export const parseJSON = response => response.json()

export const removeTrailingSlash = string => {
  return string.replace(/\/$/, '')
}
