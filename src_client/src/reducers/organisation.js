import { SET_ORGANISATION, APP_LOGOUT, SET_ORGANISATION_FILES } from '../helpers/actions'

const INITIAL_STATE = {
  organisation: {},
  activeFile: '',
  filesById: {}
}

// selectors
export const getfilesById = state => state.organisation.filesById
export const getOrganisation = state => state.organisation.organisation
export const getActiveFile = state => state.organisation.activeFile

const organisation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'New':
      return INITIAL_STATE
    case SET_ORGANISATION:
      return Object.assign({}, state, {
        organisation: action.organisation
      })
    case SET_ORGANISATION_FILES:
      return Object.assign({}, state, {
        filesById: action.filesById
      })
    case APP_LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}

export default organisation
