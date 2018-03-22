import { combineReducers } from 'redux'
import accounts from './accounts'
import file from './file'
import organisation from './organisation'
import publicReducer from './publicReducer'

const rootReducer = combineReducers({
  accounts,
  file,
  organisation,
  publicReducer
})

export default rootReducer
