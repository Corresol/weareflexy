import pathToRegexp from 'path-to-regexp'

import {
  StateUtils,
  NavigationActions
} from 'react-navigation'

const getScreenForRouteName = (routeConfigs, routeName) => {
  const routeConfig = routeConfigs[routeName]

  if (routeConfig.screen) {
    return routeConfig.screen
  }

  if (typeof routeConfig.getScreen === 'function') {
    const screen = routeConfig.getScreen()

    return screen
  }
}

const getTitleforRouteName = (routeConfigs, routeName) => {
  const routeConfig = routeConfigs[routeName]

  if (routeConfig.title) {
    return routeConfig.title
  }

  if (typeof routeConfig.getTitle === 'function') {
    const title = routeConfig.getTitle()

    return title
  }
}

const applyConfig = (configurer, navigationOptions, configProps) => {
  if (typeof configurer === 'function') {
    return {
      ...navigationOptions,
      ...configurer({
        ...configProps,
        navigationOptions
      })
    }
  }
  if (typeof configurer === 'object') {
    return {
      ...navigationOptions,
      ...configurer
    }
  }

  return navigationOptions
}

const createConfigGetter = (routeConfigs, navigatorScreenConfig) => (navigation, screenProps) => {
  const {
    state
  } = navigation

  const route = state

  const Component = getScreenForRouteName(routeConfigs, route.routeName)

  let outputConfig = {}

  const routeConfig = routeConfigs[route.routeName]

  const routeScreenConfig = routeConfig.navigationOptions
  const componentScreenConfig = Component.navigationOptions

  const configOptions = {
    navigation,
    screenProps: screenProps || {}
  }

  outputConfig = applyConfig(
    navigatorScreenConfig,
    outputConfig,
    configOptions
  )

  outputConfig = applyConfig(
    componentScreenConfig,
    outputConfig,
    configOptions
  )

  outputConfig = applyConfig(routeScreenConfig, outputConfig, configOptions)

  return outputConfig
}

const uniqueBaseId = `id-${Date.now()}`

let uuidCount = 0

function _getUuid () {
  return `${uniqueBaseId}-${uuidCount++}`
}

export default (routeConfigs, initialState) => {
  const routeNames = Object.keys(routeConfigs)

  const initialRouteName = routeNames[0]

  const paths = {}

  // Build paths for each route
  routeNames.forEach(routeName => {
    let pathPattern = paths[routeName] || routeConfigs[routeName].path

    const matchExact = !!pathPattern

    if (typeof pathPattern !== 'string') {
      pathPattern = routeName
    }

    const keys = []

    let re = pathToRegexp(pathPattern, keys)

    if (!matchExact) {
      const wildcardRe = pathToRegexp(`${pathPattern}/*`, keys)
      re = new RegExp(`(?:${re.source})|(?:${wildcardRe.source})`)
    }
    paths[routeName] = { re, keys, toPath: pathToRegexp.compile(pathPattern) }
  })

  return {
    getComponentForState: (state) => {
      const activeChildRoute = state.routes[state.index]
      const { routeName } = activeChildRoute

      return getScreenForRouteName(routeConfigs, routeName)
    },

    getComponentForRouteName: (routeName) => {
      return getScreenForRouteName(routeConfigs, routeName)
    },

    getTitleForRouteName: (routeName) => {
      return getTitleforRouteName(routeConfigs, routeName)
    },

    getStateForAction: (action, state) => {
      // Set up the initial state if needed
      if (!state) {
        let route = {}

        if (action.type === NavigationActions.NAVIGATE) {
          return {
            index: 0,
            routes: [
              {
                ...action,
                type: undefined,
                key: `Init-${_getUuid()}`
              }
            ]
          }
        }

        route = {
          ...route,
          routeName: initialRouteName,
          key: `Init-${_getUuid()}`,
          params: {}
        }

        state = {
          index: 0,
          routes: [route]
        }
      }

      // If this is the INIT action and initialState is set, fill out the entire stack
      if (action.type === NavigationActions.INIT && initialState && initialState.length > 0) {
        // Watch out this fucker is mutable!!
        const initialStack = [
          ...initialState
        ]

        const index = initialStack.length - 1

        let routeStack = [{
          routeName: initialStack[0],
          key: `Init-${_getUuid()}`,
          params: {}
        }]

        initialStack.shift()

        initialStack.forEach(item => {
          routeStack.push({
            routeName: item,
            key: _getUuid(),
            params: {}
          })
        })

        state = {
          index: index,
          routes: routeStack
        }
      }

      // Handle explicit push navigation action
      if (action.type === NavigationActions.NAVIGATE) {
        console.log('Route Paths', state, routeNames)

        let nextRouteName

        if (action.routeName === 'GONEXT') {
          nextRouteName = routeNames[state.index + 1]
        } else {
          nextRouteName = action.routeName
        }

        let route

        route = {
          params: action.params,
          key: _getUuid(),
          routeName: nextRouteName
        }

        return StateUtils.push(state, route)
      }

      if (action.type === NavigationActions.RESET) {
        const resetAction = action

        return {
          ...state,
          routes: resetAction.actions.map(childAction => {
            const route = {
              ...childAction,
              key: _getUuid()
            }

            delete route.type
            return route
          }),
          index: action.index
        }
      }

      if (action.type === NavigationActions.BACK) {
        let backRouteIndex = null

        if (action.key) {
          const backRoute = state.routes.find((route) => route.key === action.key)

          backRouteIndex = state.routes.indexOf(backRoute)
        }

        if (backRouteIndex == null) {
          return StateUtils.pop(state)
        }

        if (backRouteIndex > 0) {
          return {
            ...state,
            routes: state.routes.slice(0, backRouteIndex),
            index: backRouteIndex - 1
          }
        }
      }

      return state
    },

    getPathAndParamsForState: (state) => {
      const route = state.routes[state.index]
      const routeName = route.routeName

      const subPath = paths[routeName].toPath(route.params)
      let path = subPath
      let params = route.params

      return {
        path,
        params
      }
    },

    getActionForPathAndParams: (pathToResolve) => {
      // If the path is empty (null or empty string)
      // just return the initial route action
      if (!pathToResolve) {
        return NavigationActions.navigate({
          routeName: initialRouteName
        })
      }

      const [pathNameToResolve, queryString] = pathToResolve.split('?')

      // Attempt to match `pathNameToResolve` with a route in this router's
      // routeConfigs
      let matchedRouteName
      let pathMatch
      let pathMatchKeys

      for (const [routeName, path] of Object.entries(paths)) {
        const {
          re, keys
        } = path

        pathMatch = re.exec(pathNameToResolve)

        if (pathMatch && pathMatch.length) {
          pathMatchKeys = keys
          matchedRouteName = routeName
          break
        }
      }

      // We didn't match -- return null
      if (!matchedRouteName) {
        return null
      }

      // reduce the items of the query string. any query params may
      // be overridden by path params
      const queryParams = (queryString || '')
        .split('&')
        .reduce((result, item) => {
          if (item !== '') {
            const nextResult = result || {}
            const [key, value] = item.split('=')
            nextResult[key] = value
            return nextResult
          }
          return result
        }, null)

      // reduce the matched pieces of the path into the params
      // of the route. `params` is null if there are no params.
      /* $FlowFixMe */
      const params = pathMatch
        .slice(1)
        .reduce((result, matchResult, i) => {
          const key = pathMatchKeys[i]
          if (key.asterisk || !key) {
            return result
          }
          const nextResult = result || {}
          const paramName = key.name
          nextResult[paramName] = matchResult
          return nextResult
        }, queryParams)

      return NavigationActions.navigate({
        routeName: matchedRouteName,
        ...(params ? { params } : {}),
        nestedAction: {}
      })
    },

    getScreenOptions: createConfigGetter(
      routeConfigs,
      {}
    )
  }
}
