import {
  getNavigator,
  getInitialRoute
} from '../../containers/Navigator'

import {
  routeConfig,
  initialRoutes
} from './routeConfig'

const navigator = (stage) => {
  const initialSet = Object.assign({}, initialRoutes)

  const initial = getInitialRoute(initialSet, stage)

  return getNavigator(initial, routeConfig)
}

export default navigator
