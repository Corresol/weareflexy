import React, { Component } from 'react'
import {
  Animated,
  Easing
} from 'react-native'

import {
  Transitioner
} from 'react-navigation'

import {
  navResetAction
} from './index'

import StackView from '../StackView'

const ANIMATION_DURATION = 250

const isSceneActive = (scene) => {
  return scene.isActive
}

const buildTransitionProps = (props, state) => {
  const { navigation } = props

  const { layout, position, progress, scenes } = state

  const scene = scenes.find(isSceneActive)

  return {
    layout,
    navigation,
    position,
    progress,
    scenes,
    scene,
    index: scene.index
  }
}

class AltTransitioner extends Transitioner {
  constructor (props, context) {
    super(props, context)

    this.firstRender = true
  }

  _onLayout (event) {
    const {
      height,
      width
    } = event.nativeEvent.layout

    if (
      this.state.layout.initWidth === width &&
      this.state.layout.initHeight === height
    ) {
      return
    }

    const layout = {
      ...this.state.layout,
      initHeight: height,
      initWidth: width,
      isMeasured: true
    }

    layout.height.setValue(height)
    layout.width.setValue(width)

    const nextState = {
      ...this.state,
      layout
    }

    this._transitionProps = buildTransitionProps(this.props, nextState)
    this.setState(nextState)

    if (this.firstRender) {
      this.props.onTransitionEnd && this.props.onTransitionEnd(this._transitionProps)
    }
  }
}

class MainTransitioner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      prevHeaderState: false,
      transitionEnded: true
    }

    this.endTransition = new Animated.Value(0)
  }

  onTransitionStart = (transitionProps, prevTransitionProps) => {
    this.setState({
      transitionEnded: false
    })
  }

  onTransitionEnd = (transitionProps, prevTransitionProps) => {
    const {
      scene
    } = transitionProps

    const view = this._getCurrentView(scene)

    const newHeaderState = view.header

    const {
      prevHeaderState
    } = this.state

    let state = {
      transitionEnded: true
    }

    const currentAnimValue = this.endTransition._value

    // flip values for animation
    let startValue = currentAnimValue
    let endValue = currentAnimValue === 0 ? 1 : 0

    if (prevHeaderState !== newHeaderState) {
      state.prevHeaderState = newHeaderState

      this.endTransition.setValue(startValue)

      Animated.timing(this.endTransition, {
        toValue: endValue,
        duration: ANIMATION_DURATION,
        easing: Easing.linear()
      }).start()
    }

    this.setState(state)
  }

  _configureTransition (transitionProps, prevTransitionProps) {
    return {
      duration: ANIMATION_DURATION
    }
  }

  _getCurrentView (scene) {
    const CurrentView = this.props.router.getComponentForRouteName(scene.route.routeName)

    let {
      viewMenuTitle,
      showHeader,
      background
    } = CurrentView

    if (!background) background = false

    if (!viewMenuTitle) viewMenuTitle = scene.route.routeName

    if (showHeader === null) showHeader = true

    return {
      title: viewMenuTitle,
      header: showHeader,
      background: background
    }
  }

  _render = (transitionProps, prevTransitionProps) => {
    const transferProps = {
      ...transitionProps,
      endTransition: this.endTransition,
      close: this.props.close,
      drawer: this.props.drawer
    }

    return (
      <StackView
        {...transferProps}
        transitionEnded={this.state.transitionEnded}
        router={this.props.router}
      />
    )
  }

  componentWillReceiveProps (nextProps) {
    console.log('New props to navigator', nextProps)

    if (nextProps.reset !== this.props.reset) {
      const reset = navResetAction(nextProps.reset)

      this.props.navigation.dispatch(reset)
    }
  }

  render () {
    return (
      <AltTransitioner
        configureTransition={this._configureTransition}
        navigation={this.props.navigation}
        render={this._render}
        onTransitionStart={this.onTransitionStart}
        onTransitionEnd={this.onTransitionEnd}
      />
    )
  }
}

export default MainTransitioner
