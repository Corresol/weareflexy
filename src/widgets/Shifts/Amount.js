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
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: em(0.5)
  },
  amount: {
    color: colors.ui_1,
    textAlign: 'right'
  },
  label: {
    color: colors.ui_1,
    textAlign: 'right'
  },
  asterisk: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: colors.text_alternate,
    fontSize: em(1),
    flexGrow: 0,
    flexShrink: 0
  }
})

const normal = StyleSheet.create({
  amount: {
    color: colors.ui_1
  },
  label: {
    color: colors.ui_1
  },
  asterisk: {
    color: colors.text_alternate
  }
})

const selected = StyleSheet.create({
  amount: {
    color: 'rgb(255,255,255)'
  },
  label: {
    color: 'rgb(255,255,255)'
  },
  asterisk: {
    color: 'rgb(255,255,255)'
  }
})

export default class Amount extends Component {
  render () {
    const type = this.props.type

    const stateStyle = type === 'selected' ? selected : normal

    return (
      <View style={styles.layout}>
        <TextBox localStyle={[text.subtitle, styles.amount, stateStyle.amount]}>£{this.props.amount}</TextBox>
        <TextBox localStyle={[styles.label, stateStyle.label]}>Estimated</TextBox>
        <TextBox localStyle={[styles.asterisk, stateStyle.asterisk]}>*</TextBox>
      </View>
    )
  }
}
