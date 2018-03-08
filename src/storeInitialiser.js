import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './reducers'

import storage from './utils/storage'

import {
  getJobCategories
} from './actions'

const storeCreator = (initial) => {
  return createStore(
    rootReducer,
    initial, // either empty or filled from storage
    compose(
      applyMiddleware(thunkMiddleware)
    )
  )
}

export default () => {
  let storeMain = null

  return storage.all()
    .then(result => {
      let data = {}

      if (result) {
        data = result
      }

      return storeCreator(data)
    })
    .then(store => {
      storeMain = store

      const hasAuth = store.getState().authentication

      if (hasAuth) return store.dispatch(getJobCategories())

      return storeMain
    })
    .then(store => {
      return storeMain
    })
}
