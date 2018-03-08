import React, { Component } from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import Back from './Back'
import Menu from './Menu'
import ProfileImage from '../ProfileImage'

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
    height: em(6.5),
    paddingTop: em(1.5),
    backgroundColor: 'transparent'
  },
  inflexible: {
    flexGrow: 0,
    width: em(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    height: em(3.25)
  },
  flexible: {
    alignItems: 'center',
    paddingLeft: em(0.5),
    paddingRight: em(0.5)
  },
  options: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: em(0.5)
  },
  name: {
    textAlign: 'center',
    marginTop: em(0.5),
    marginBottom: em(0.5)
  },
  title: {
    textAlign: 'center'
  }
})

class Profile extends Component {
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
          <Vertical localStyle={styles.flexible}>
            <ProfileImage
              logo
              border
              size={5}
            />
          </Vertical>
          <View style={styles.inflexible}>
            <Menu action={back} />
          </View>
        </Horizontal>
      </Vertical>
    )
  }
}

export default Profile
