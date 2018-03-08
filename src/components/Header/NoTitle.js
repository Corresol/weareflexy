import React, { Component } from 'react'

import {
  View,
  Image,
  StyleSheet
} from 'react-native'

import Back from './Back'
import Close from './Close'

import {
  Horizontal,
  Vertical
} from '../../containers/Grid'

import {
  em
} from '../../styles'

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
  }
})

class NoTitle extends Component {
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
            <Image
              source={require('../../../assets/png/logo_horizontal/logo.png')}
              style={styles.logo}
            />
          </Horizontal>
          <View style={styles.inflexible}>
            {transition.close && <Close action={transition.drawer} />}
          </View>
        </Horizontal>
      </Vertical>
    )
  }
}

export default NoTitle
