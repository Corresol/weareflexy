import {
  getNavigator,
  getInitialRoute
} from '../../containers/Navigator'

import {
  routeConfig,
  initialRoutes
} from './routeConfig'

const navigator = (stage) => {
  console.log('Root navigator stage', stage)
  const initialSet = Object.assign({}, initialRoutes)

  const initial = getInitialRoute(initialSet, stage)

  return getNavigator(initial, routeConfig)
}

export default navigator
