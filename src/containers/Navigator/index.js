import customRouter from './customRouter'
import MainTransitioner from './MainTransitioner'

import {
  createNavigationContainer,
  createNavigator,
  NavigationActions
} from 'react-navigation'

const resetRoutes = (routeList) => {
  return routeList.map(route => {
    return NavigationActions.navigate({
      routeName: route
    })
  })
}

const navResetAction = (routeList, routeIndex) => {
  let index = routeList.length - 1

  if (routeIndex) index = routeIndex

  const resetAction = NavigationActions.reset({
    index: index,
    actions: resetRoutes(routeList)
  })

  return resetAction
}

const getInitialRoute = (initialRoutes, stage) => {
  const reset = initialRoutes[stage] ? initialRoutes[stage] : []

  return reset
}

const getNavigator = (initial, routeConfig) => {
  const router = customRouter(routeConfig, initial)

  const Navigator = createNavigationContainer(createNavigator(router)(MainTransitioner))

  return Navigator
}

export {
  getNavigator,
  getInitialRoute,
  navResetAction
}
