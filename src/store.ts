import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';

import storage from './utils/storage'

export const store = createStore(
  rootReducer,
  {}, //empty inital state, maybe hydrate from the server on startup or from async storage
  compose(
    applyMiddleware(thunkMiddleware)
  )
);

const storeCreator = (initial) => {
  return createStore(
    rootReducer,
    initial, // either empty or filled from storage
    compose(
      applyMiddleware(thunkMiddleware)
    )
  )
}

export const storeInitialiser = () => {
  return storage.all()
    .then(result => {
      let data = {}

      if (result) {
        data = result
      }

      return storeCreator(data)
    })
    .then(store => {
      return store
    })
}
