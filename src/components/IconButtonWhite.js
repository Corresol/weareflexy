import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import Button from './Button'

import {
  box,
  text,
  colors
} from '../styles'

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor: colors.complete
  },
  button: {
    flexDirection: 'row',
    flexGrow: 0,
    flexWrap: 'nowrap'
  },
  text: {
    color: colors.ui_1
  }
})

export default class IconButtonWhite extends Component {
  handlePress () {
    if (!this.props.ghosted) this.props.action()
  }

  render () {
    return (
      <View style={[box.button, styles.layout, this.props.localStyle]}>
        <Button localStyle={[box.padding, styles.button]} action={this.handlePress.bind(this)}>
          {this.props.children}
          <Text style={[text.bold, styles.text]}>{this.props.label}</Text>
        </Button>
      </View>
    )
  }
}
