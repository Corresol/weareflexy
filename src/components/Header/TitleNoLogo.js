import React, { Component } from 'react'

import {
  Animated,
  View,
  Text,
  StyleSheet
} from 'react-native'

import Back from './Back'
import Close from './Close'

import {
  Horizontal,
  Vertical
} from '../../containers/Grid'

import {
  text,
  em
} from '../../styles'

import simpleID from '../../utils/simpleID'

const styles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    height: em(5),
    paddingTop: em(1.5),
    backgroundColor: 'transparent'
  },
  inflexible: {
    flexGrow: 0,
    width: em(2.5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexible: {
    alignItems: 'center',
    paddingLeft: em(0.5),
    paddingRight: em(0.5)
  },
  logo: {
    width: 101,
    height: 32
  },
  animated: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center'
  }
})

class TitleNoLogo extends Component {
  render () {
    const {
      back,
      transition,
      transitionEnded
    } = this.props

    const canGoBack = transition.scenes.length > 1 && transitionEnded

    return (
      <Vertical localStyle={styles.layout}>
        <Horizontal>
          <View style={styles.inflexible}>
            { canGoBack && <Back action={back} />}
          </View>
          <Horizontal localStyle={styles.flexible}>
            <Titles {...transition} />
          </Horizontal>
          <View style={styles.inflexible}>
            {transition.close && <Close action={transition.drawer} />}
          </View>
        </Horizontal>
      </Vertical>
    )
  }
}

class Titles extends Component {
  render () {
    const {
      scenes,
      layout,
      position
    } = this.props

    const children = scenes.map(scene => {
      let ID = simpleID()

      return (
        <Title
          title={scene.title}
          index={scene.index}
          layout={layout}
          position={position}
          key={ID}
        />
      )
    })

    return (
      <Horizontal>
        {children}
      </Horizontal>
    )
  }
}

const Title = (props) => {
  const {
    layout,
    position,
    index,
    title
  } = props

  const width = layout.initWidth

  const next = index - 1
  const nextOutPrevIn = index
  const prevCliff = index + 0.99
  const prev = index + 1

  const opacity = position.interpolate({
    inputRange: [next, nextOutPrevIn, prevCliff, prev],
    outputRange: [0, 1, 0.3, 0]
  })

  const translateX = position.interpolate({
    inputRange: [next, nextOutPrevIn, prev],
    outputRange: [(width * -1), 0, width]
  })

  let style = {
    opacity: opacity,
    transform: [
      {
        translateX: translateX
      }
    ]
  }

  let viewTitle = title

  if (typeof title === 'function') {
    viewTitle = title()
  }

  return (
    <Animated.View style={[styles.animated, style]}>
      <Text style={text.title}>{viewTitle}</Text>
    </Animated.View>
  )
}

export default TitleNoLogo
