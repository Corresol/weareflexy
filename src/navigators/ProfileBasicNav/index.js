import {
  getNavigator,
  getInitialRoute
} from '../../containers/Navigator'

import {
  routeConfig,
  routeConfigSet,
  initialRoutes
} from './routeConfig'

const navigator = (stage = '', flow, notification) => {
  // const initialSet = Object.assign({}, initialRoutes)

  const initialSet = {}

  const initial = getInitialRoute(initialSet, stage)

  let routes = Object.assign({}, routeConfig)

  if (flow) routes = Object.assign({}, routeConfigSet[flow])

  if (notification) routes = Object.assign({}, routeConfigSet['notification'], routeConfigSet[flow])

  return getNavigator(initial, routes)
}

export default navigator
