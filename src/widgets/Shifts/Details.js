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
    paddingTop: em(0.5),
    paddingBottom: em(0.5)
  },
  row: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  withBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.text_alternate
  },
  cell: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  first: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    width: em(6.25),
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    color: colors.text_alternate
  }
})

const normal = StyleSheet.create({
  text: {
    color: colors.text_alternate
  },
  withBorder: {
    borderColor: colors.text_alternate
  }
})

const selected = StyleSheet.create({
  text: {
    color: 'rgb(255,255,255)'
  },
  withBorder: {
    borderColor: 'rgb(255,255,255)'
  }
})

export default class Details extends Component {
  render () {
    const type = this.props.type

    const stateStyle = type === 'selected' ? selected : normal

    const boxStyle = this.props.border ? [styles.row, styles.layout, stateStyle.withBorder] : [styles.row, styles.layout]

    return (
      <View style={boxStyle}>
        <View style={styles.first}>
          <TextBox localStyle={[stateStyle.text]}>{this.props.day}</TextBox>
          <TextBox localStyle={[text.normal, stateStyle.text]}>{this.props.date}</TextBox>
        </View>
        <View style={styles.cell}>
          <TextBox localStyle={[text.normal, stateStyle.text]}>Hours</TextBox>
          <TextBox localStyle={[text.normal, stateStyle.text]}>{this.props.hours}</TextBox>
        </View>
        <View style={styles.cell}>
          <TextBox localStyle={[text.normal, stateStyle.text]}>Hourly rate</TextBox>
          <TextBox localStyle={[text.normal, stateStyle.text]}>£{this.props.rate}</TextBox>
        </View>
      </View>
    )
  }
}
