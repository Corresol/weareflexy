import React, { Component } from 'react'

import {
  View,
  Image,
  StyleSheet
} from 'react-native'

import Back from './Header/Back'
import Search from './Header/Search'
import Menu from './Header/Menu'

import {
  Horizontal,
  Vertical
} from '../containers/Grid'

import {
  em
} from '../styles'

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
  options: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: em(0.5)
  },
  logo: {
    width: 101,
    height: 32
  }
})

class NotificationHeader extends Component {
  render () {
    const canGoBack = true

    return (
      <Vertical localStyle={styles.layout}>
        <Horizontal>
          <View style={styles.inflexible}>
            { canGoBack && <Back action={this.props.action} />}
          </View>
          <Horizontal localStyle={styles.flexible}>
            <Image
              source={require('../../assets/png/logo_horizontal/logo.png')}
              style={styles.logo}
            />
          </Horizontal>
          <Horizontal localStyle={styles.options}>
            <Search action={() => { return null }} />
          </Horizontal>
          <View style={styles.inflexible}>
            <Menu action={() => { return null }} />
          </View>
        </Horizontal>
      </Vertical>
    )
  }
}

export default NotificationHeader
