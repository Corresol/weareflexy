import React, { Component } from 'react'

import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  PanResponder
} from 'react-native'

import {
  em
} from '../../styles'

import ProfileBlock from '../../widgets/ProfileBlock'

const HEADER_MIN_HEIGHT = em(16)
const HEADER_MAX_HEIGHT = Dimensions.get('window').height - em(6.5)
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    flexShrink: 1
  },
  header: {
    flexGrow: 0,
    flexShrink: 0,
    height: em(16)
  },
  container: {
    paddingTop: em(1),
    paddingBottom: em(1),
    backgroundColor: 'rgb(246,246,246)'
  },
  noFlex: {
    flexGrow: 0
  },
  altPadding: {
    paddingLeft: em(1.25),
    paddingRight: em(1.25)
  },
  scroller: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'rgb(246,246,246)'
  }
})

class Profile extends Component {
  static viewMenuTitle = 'Welcome to Flexy!'
  static showHeader = true
  static headerType = 'profile'

  constructor (props) {
    super(props)

    this.state = {
      moveY: new Animated.Value(0)
    }

    this.deviceHeight = Dimensions.get('window').height
  }

  render () {
    const headerHeight = this.state.moveY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
      extrapolate: 'clamp'
    })

    const responder = PanResponder.create({
      onPanResponderGrant: (event) => {
        this.state.moveY.stopAnimation((value) => {
          this._positionStartValue = value
        })
      },
      onMoveShouldSetPanResponder: (event, gesture) => {
        const distance = Math.abs(gesture.dy)

        if (distance > 30) {
          return true
        }
      },
      onPanResponderMove: (event, gesture) => {
        let distance = gesture.dy

        let position = this._positionStartValue + distance

        if (position > 0 && position < HEADER_SCROLL_DISTANCE) {
          this.state.moveY.setValue(position)
        }
      }
    })

    return (
      <View style={styles.layout}>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <View style={{flex: 1}} {...responder.panHandlers}>
            <ProfileBlock lines={2} />
          </View>
        </Animated.View>
        <View style={styles.scroller}>
          <ScrollView
            style={styles.scroller}
          >
            <Settings />
          </ScrollView>
        </View>
      </View>
    )
  }
}

const settingsStyle = StyleSheet.create({
  layout: {
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(1.25),
    paddingRight: em(1.25),
    backgroundColor: 'rgb(246,246,246)'
  }
})

const Settings = (props) => {
  let panes = []

  for (let x = 0; x < 20; x++) {
    panes.push(<Pane key={x} />)
  }

  return (
    <View style={settingsStyle.layout}>
      {panes}
    </View>
  )
}

const paneStyle = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    height: em(5),
    marginBottom: em(1),
    backgroundColor: 'rgb(255,255,255)'
  }
})

const Pane = (props) => {
  return (
    <View style={paneStyle.layout} />
  )
}

export default Profile
