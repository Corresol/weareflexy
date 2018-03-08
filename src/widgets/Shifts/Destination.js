import React, { Component } from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em,
  colors
} from '../../styles'

import TextBox from '../../components/TextBox'
import MapIcon from './MapIcon'
import Next from './Next'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  text: {
    alignSelf: 'center',
    marginLeft: em(0.5),
    marginRight: em(0.5),
    maxWidth: em(9)
  }
})

const normal = StyleSheet.create({
  text: {
    color: colors.text_alternate
  }
})

const selected = StyleSheet.create({
  text: {
    color: 'rgb(255,255,255)'
  }
})

export default class Destination extends Component {
  render () {
    const type = this.props.type

    const pinColor = type === 'selected' ? 'rgb(255,255,255)' : colors.ui_1

    const stateStyle = type === 'selected' ? selected : normal

    return (
      <View style={[styles.row]}>
        <MapIcon color={pinColor} />
        <TextBox localStyle={[styles.text, stateStyle.text]}>{this.props.location}</TextBox>
        <Next type={type} />
      </View>
    )
  }
}
