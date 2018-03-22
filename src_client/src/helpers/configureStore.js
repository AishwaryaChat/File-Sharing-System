import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'

import rootReducer from '../reducers/index'

import { loadState, saveState } from './localStorage.js'

const configureStore = () => {
  const persistedState = loadState()

  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
  )

  store.subscribe(
    throttle(() => {
      saveState({
        accounts: store.getState().accounts,
        file: store.getState().file,
        organisation: store.getState().organisation,
        publicReducer: store.getState().publicReducer
      })
    }, 1000)
  )

  return store
}

export default configureStore
