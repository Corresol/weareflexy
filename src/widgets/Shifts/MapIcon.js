import React, { Component } from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em
} from '../../styles'

import {
  MapPin
} from '../../components/Icons'

const styles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(2),
    height: em(2)
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: 17,
    height: 26
  }
})

export default class MapIcon extends Component {
  render () {
    return (
      <View style={styles.layout}>
        <View style={styles.icon}>
          <MapPin
            width={17}
            color={this.props.color}
          />
        </View>
      </View>
    )
  }
}
