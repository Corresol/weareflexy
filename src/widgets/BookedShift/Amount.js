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
  }
})

export default class Amount extends Component {
  render () {
    return (
      <View style={styles.layout}>
        <TextBox localStyle={[text.subtitle, styles.amount]}>£{this.props.amount}</TextBox>
      </View>
    )
  }
}
