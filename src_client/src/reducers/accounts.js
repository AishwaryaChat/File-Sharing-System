import { SET_LOGIN, APP_LOGOUT, SET_REGISTERED } from '../helpers/actions'

const INITIAL_STATE = {
  isLoggedIn: false,
  id: '',
  email: '',
  userId: '',
  isRegistered: false
}

export const getIsLoggedIn = state => state.accounts.isLoggedIn
export const getJwt = state => state.accounts.id
export const getUserId = state => state.accounts.userId
export const getIsRegistered = state => state.accounts.isRegistered

const accounts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'New':
      return INITIAL_STATE
    case SET_LOGIN: {
      return Object.assign({}, state, {
        email: action.data.email,
        id: action.data.id,
        userId: action.data.userId,
        isLoggedIn: true,
        isRegistered: false
      })
    }
    case SET_REGISTERED:
      return Object.assign({}, state, {isRegistered: true})
    case APP_LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}

export default accounts
