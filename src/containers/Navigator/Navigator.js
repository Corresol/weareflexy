import {
  router,
  routeConfig
} from './router'
import customRouter from './customRouter'
import MainTransitioner from './MainTransitioner'

import {
  createNavigationContainer,
  createNavigator
} from 'react-navigation'

const Navigator = createNavigationContainer(createNavigator(router)(MainTransitioner))

const getNavigator = (initial) => {
  console.log('Recieved initial', initial)

  const router = customRouter(routeConfig, initial)

  const Navigator = createNavigationContainer(createNavigator(router)(MainTransitioner))

  return Navigator
}

// const getNavigator = (initial, routeConfig) => {
//   const router = customRouter(routeConfig, initial)

//   const Navigator = createNavigationContainer(createNavigator(router)(MainTransitioner))

//   return Navigator
// }

export {
  Navigator,
  getNavigator
}
