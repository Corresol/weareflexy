import React, { Component } from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em,
  text,
  colors
} from '../../styles'

import TextBox from '../../components/TextBox'

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: em(0.5),
    paddingBottom: em(0.5),
    marginTop: em(1)
  },
  text: {
    color: colors.text_alternate
  }
})

export default class Details extends Component {
  render () {
    const title = `${this.props.days.length} days from ${this.props.hours}`
    const list = this.props.days.join(' - ')

    return (
      <View style={[styles.layout]}>
        <TextBox localStyle={[styles.text]}>{title}</TextBox>
        <TextBox localStyle={[text.normal, styles.text, styles.list]}>{list}</TextBox>
      </View>
    )
  }
}
