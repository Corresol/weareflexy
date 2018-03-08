import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Easing,
  Keyboard
} from 'react-native'
import Header from '../components/Header'
import Background from '../components/Background'

import clamp from '../utils/clamp'
import simpleID from '../utils/simpleID'

const GESTURE_RESPONSE_DISTANCE = 25
const RESPOND_THRESHOLD = 20
const ANIMATION_DURATION = 250
const POSITION_THRESHOLD = 1 / 2

const calcMovement = (startValue, width, distance, target) => {
  const currentValue = startValue - distance / width
  const value = clamp(target - 1, currentValue, target)

  return value
}

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    flexDirection: 'column',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  holder: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  roller: {
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: 'transparent'
  },
  scene: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch'
  }
})

class StackView extends Component {
  constructor (props) {
    super(props)

    this._immediateIndex = null
  }

  _reset (resetToIndex, duration, position) {
    Animated.timing(position, {
      toValue: resetToIndex,
      duration,
      easing: Easing.linear(),
      useNativeDriver: position.__isNative
    }).start()
  }

  _goBack (backFromIndex, duration, position) {
    const {
      navigation
    } = this.props

    const toValue = Math.max(backFromIndex - 1, 0)

    this._immediateIndex = toValue

    Animated.timing(position, {
      toValue,
      duration,
      easing: Easing.linear(),
      useNativeDriver: position.__isNative
    }).start(() => {
      this._immediateIndex = null

      navigation.goBack()
    })
  }

  _getCurrentView (scene) {
    const CurrentView = this.props.router.getComponentForRouteName(scene.route.routeName)

    let {
      viewMenuTitle,
      showHeader,
      background,
      headerType
    } = CurrentView

    if (!background) background = false

    if (!viewMenuTitle) viewMenuTitle = scene.route.routeName

    if (showHeader === null) showHeader = true

    if (!headerType) headerType = 'title'

    return {
      title: viewMenuTitle,
      header: showHeader,
      headerType: headerType,
      background: background
    }
  }

  render () {
    const {
      layout,
      position,
      scenes,
      router,
      navigation,
      scene,
      transitionEnded,
      close,
      drawer
    } = this.props

    const {
      index
    } = scene

    const passProps = {
      position,
      layout,
      router,
      navigation,
      drawer,
      transitionEnded
    }

    const Scenes = scenes.map((scene) => {
      let ID = simpleID()

      return (
        <SceneView {...passProps} scene={scene} key={ID} />
      )
    })

    const responder = PanResponder.create({
      onPanResponderTerminate: () => {
        this._isResponding = false
        this._reset(index, 0, position)
      },
      onPanResponderGrant: () => {
        position.stopAnimation((value) => {
          this._isResponding = true
          this._positionStartValue = value
        })

        Keyboard.dismiss()
      },
      onMoveShouldSetPanResponder: (event, gesture) => {
        if (index !== scene.index) {
          return false
        }

        const immediateIndex = this._immediateIndex == null ? index : this._immediateIndex
        const width = layout.width.__getValue()
        const widthHasBeenMeasured = !!width

        // Measure the distance from the touch to the edge of the screen
        const screenEdgeDistance = event.nativeEvent.pageX - gesture.dx
        // Compare to the gesture distance relavant to card or modal
        // GESTURE_RESPONSE_DISTANCE is about 25 or 30. Or 135 for modals
        if (screenEdgeDistance > GESTURE_RESPONSE_DISTANCE) {
          // Reject touches that started in the middle of the screen
          return false
        }

        const hasDraggedEnough = Math.abs(gesture.dx) > RESPOND_THRESHOLD

        const isOnFirstCard = (immediateIndex === 0)

        return (hasDraggedEnough && widthHasBeenMeasured && !isOnFirstCard)
      },
      onPanResponderMove: (event, gesture) => {
        // Handle the moving touches for our granted responder
        let value = calcMovement(this._positionStartValue, layout.width.__getValue(), gesture.dx, index)

        position.setValue(value)
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (event, gesture) => {
        if (!this._isResponding) {
          return
        }

        this._isResponding = false

        const immediateIndex = this._immediateIndex == null ? index : this._immediateIndex

        // Calculate animate duration according to gesture speed and moved distance
        const distance = layout.width.__getValue()
        const moved = gesture.dx
        const gestureVelocity = gesture.vx
        const defaultVelocity = distance / ANIMATION_DURATION
        const velocity = Math.max(Math.abs(gestureVelocity), defaultVelocity)
        const resetDuration = moved / velocity
        const goBackDuration = (distance - moved) / velocity

        // To asyncronously get the current animated value, we need to run stopAnimation:
        position.stopAnimation((value) => {
          // If the speed of the gesture release is significant, use that as the indication
          // of intent
          if (gestureVelocity < -0.5) {
            this._reset(immediateIndex, resetDuration, position)
            return
          }

          if (gestureVelocity > 0.5) {
            this._goBack(immediateIndex, goBackDuration, position)
            return
          }

          // Then filter based on the distance the screen was moved. Over a third of the way swiped,
          // and the back will happen.
          if (value <= index - POSITION_THRESHOLD) {
            this._goBack(immediateIndex, goBackDuration, position)
          } else {
            this._reset(immediateIndex, resetDuration, position)
          }
        })
      }
    })

    const sceneProps = scenes.map(scene => {
      const view = this._getCurrentView(scene)

      return {
        title: view.title,
        index: scene.index
      }
    })

    const headerProps = {
      scenes: sceneProps,
      layout,
      position,
      close,
      drawer
    }

    const view = this._getCurrentView(scene)

    return (
      <View {...responder.panHandlers} style={styles.layout}>
        <Background background={view.background} />
        <RollerBlind
          endTransition={this.props.endTransition}
        >
          <Header
            type={view.headerType}
            back={navigation.goBack}
            transition={headerProps}
            transitionEnded={transitionEnded}
          />
        </RollerBlind>
        <View style={[styles.scene]}>
          {Scenes}
        </View>
      </View>
    )
  }
}

class RollerBlind extends Component {
  render () {
    const marginTop = this.props.endTransition.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0]
    })

    const opacity = this.props.endTransition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    const style = {
      opacity: opacity,
      marginTop: marginTop
    }

    return (
      <Animated.View style={[style, styles.roller]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

const SceneView = (props) => {
  const {
    position,
    layout,
    scene,
    router,
    navigation,
    drawer,
    transitionEnded
  } = props

  const {
    index
  } = scene

  const width = layout.initWidth

  const nextIn = index - 1
  const nextOutPrevIn = index
  const prevCliff = index + 0.99
  const prevOut = index + 1

  const opacity = position.interpolate({
    inputRange: [nextIn, nextOutPrevIn, prevCliff, prevOut],
    outputRange: [0, 1, 0.3, 0]
  })

  const translateX = position.interpolate({
    inputRange: [nextIn, nextOutPrevIn, prevOut],
    outputRange: [width, 0, (width * -1) * 0.25]
  })

  let animated = {
    opacity: opacity,
    transform: [
      {
        translateX: translateX
      }
    ]
  }

  // const scale = position.interpolate({
  //   inputRange: [nextIn, nextOutPrevIn, prevOut],
  //   outputRange: [0, 1, 0.25]
  // })

  // let animated = {
  //   opacity: opacity,
  //   transform: [
  //     {
  //       scale: scale
  //     }
  //   ]
  // }

  const CurrentView = router.getComponentForRouteName(scene.route.routeName)

  navigation.params = scene.route.params

  return (
    <Animated.View style={[styles.holder, animated]}>
      <CurrentView transitionEnded={transitionEnded} navigation={navigation} drawer={drawer} />
    </Animated.View>
  )
}

export default StackView
