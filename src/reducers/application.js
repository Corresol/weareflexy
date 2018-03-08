const initialAppState = {
  waiting: false,
  warning: false,
  background: true,
  drawer: false,
  debug: false
}

const app = (state = initialAppState, action = {}) => {
  switch (action.type) {
    case 'APP_WAITING':
      return Object.assign({}, state, {
        waiting: true,
        warning: false
      })
    case 'APP_READY':
      return Object.assign({}, state, {
        waiting: false,
        warning: false
      })
    case 'APP_WARNING':
      return Object.assign({}, state, {
        waiting: false,
        warning: true
      })
    case 'APP_BACKGROUND':
      return Object.assign({}, state, {
        background: action.data
      })
    case 'APP_DEBUG':
      const debug = state.debug

      return Object.assign({}, state, {
        debug: !debug
      })
    case 'APP_TOGGLE_DRAWER':
      const drawer = state.drawer

      return Object.assign({}, state, {
        drawer: !drawer
      })
    default: return state
  }
}

const appCache = (state = {}, action = {}) => {
  switch (action.type) {
    case 'SET_CACHE':
      let data = {}

      data[action.key] = action.data

      return Object.assign({}, state, data)
    case 'EMPTY_CACHE':
      console.log('Emptying Cache')
      return {}
    default: return state
  }
}

export {
  app,
  appCache
}
