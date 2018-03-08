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
    color: colors.text_alternate,
    alignSelf: 'center',
    marginLeft: em(0.5),
    marginRight: em(0.5),
    maxWidth: em(9)
  }
})

export default class Destination extends Component {
  render () {
    return (
      <View style={[styles.row]}>
        <MapIcon color={colors.ui_1} />
        <TextBox localStyle={[styles.text]}>{this.props.location}</TextBox>
        <Next />
      </View>
    )
  }
}
