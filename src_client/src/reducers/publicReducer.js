import { SET_PUBLIC_FILE } from '../helpers/actions'

const INITIAL_STATE = {
  publicFile: {}
}

export const getFile = state => state.publicReducer.publicFile

const publicReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'New':
      return INITIAL_STATE
    case SET_PUBLIC_FILE:
      return Object.assign({}, state, {publicFile: action.file})
    default:
      return state
  }
}

export default publicReducer
