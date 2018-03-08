import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  Animated,
  Easing,
  PanResponder,
  StyleSheet
} from 'react-native'

import {
  emptyCache,
  dumpState
} from '../actions'

import Button from '../components/Button'
import TextBox from '../components/TextBox'
import Spinner from '../components/Waiting'

import {
  grid,
  vw,
  em
} from '../styles'

import velocityCalc from '../utils/velocityCalc'

const MAX_PAN = vw(60)
const WIDTH = vw(100)
const DURATION = 250

export default class Frame extends Component {
  constructor (props) {
    super(props)

    this.leftPosition = new Animated.Value(0)
    this._isResponding = false
    this._open = false
  }

  _animateTo (end, duration) {
    Animated.timing(this.leftPosition, {
      toValue: end,
      duration: duration,
      easing: Easing.linear()
    }).start()
  }

  render () {
    const responder = PanResponder.create({
      onPanResponderTerminate: () => {
        this._animateTo(0, 250)
      },
      onPanResponderGrant: (event) => {
        this.leftPosition.stopAnimation((value) => {
          this._runningValue = event.nativeEvent.pageX
          this._positionStartValue = value
        })
      },
      onMoveShouldSetPanResponder: (event, gesture) => {
        const distance = gesture.dx
        const X = event.nativeEvent.pageX

        // Only move if there is has been a swipe from the extreme right edge of the screen

        const RIGHT_EDGE = WIDTH - 45

        if (this._open) {
          // We are closing, rightwards swipe
          if (X > MAX_PAN && distance > 20) {
            return true
          }
        } else {
          // We are opening, leftwards swipe
          if (X > RIGHT_EDGE && distance < -20) {
            return true
          }
        }

        return false
      },
      onPanResponderMove: (event, gesture) => {
        let screenX = event.nativeEvent.pageX

        // Only Animate if we are within the pan threshold
        if (screenX > MAX_PAN && screenX < WIDTH) {
          let value = this._positionStartValue + gesture.dx

          if (value > 0) value = 0

          this._runningValue = value

          this.leftPosition.setValue(value)
        }
      },
      onPanResponderTerminationRequest: () => {
        this._animateTo(0, 250)

        return true
      },
      onPanResponderRelease: (event, gesture) => {
        const LEFT_BOUND = WIDTH - MAX_PAN

        const direction = gesture.dx

        const duration = velocityCalc(DURATION, direction, gesture.vx, LEFT_BOUND)

        if (this._open) {
          // I am open, close me if I am swiping right
          if (direction > 0) {
            this._open = false
            this._animateTo(0, duration)
          }
        } else {
          // I am closed, open me if I am swiping left
          if (direction < 0) {
            this._open = true
            this._animateTo(LEFT_BOUND * -1, duration)
          }
        }
      }
    })

    const style = {
      transform: [
        {
          translateX: this.leftPosition
        }
      ]
    }

    return (
      <View {...responder.panHandlers} style={[grid.frame, this.props.localStyle]}>
        <Menu />
        <Animated.View style={[grid.frame, style]}>
          {this.props.children}
        </Animated.View>
        <Spinner />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    paddingTop: em(5),
    paddingLeft: vw(70),
    backgroundColor: 'rgb(0,0,0)'
  },
  button: {
    flexGrow: 0,
    marginBottom: 50
  }
})

class SideBar extends Component {
  clear = () => {
    this.props.emptyCache()
  }

  dump = () => {
    const state = this.props.dumpState()
    console.log('Store dump', state)
  }

  render () {
    return (
      <View style={[grid.frame, styles.layout]}>
        <Button action={this.clear} localStyle={styles.button} >
          <TextBox>Clear Cache</TextBox>
        </Button>
        <Button action={this.dump} localStyle={styles.button} >
          <TextBox>Dump State</TextBox>
        </Button>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    emptyCache: () => {
      return dispatch(emptyCache())
    },
    dumpState: () => {
      return dispatch(dumpState())
    }
  }
}

const Menu = connect(null, mapDispatchToProps)(SideBar)
