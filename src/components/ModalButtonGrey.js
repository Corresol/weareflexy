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
    backgroundColor: 'rgb(109,109,109)'
  },
  visibleText: {
    color: colors.complete
  },
  button: {
    flexDirection: 'row',
    flexGrow: 0,
    flexWrap: 'nowrap'
  }
})

export default class ModalButtonWhite extends Component {
  handlePress () {
    if (!this.props.ghosted) this.props.action()
  }

  render () {
    let visual = (this.props.ghosted ? box.ghosted : styles.layout)
    let textColor = (this.props.ghosted ? null : styles.visibleText)

    return (
      <View style={[box.button, this.props.localStyle, visual]}>
        <Button localStyle={[box.padding, styles.button]} action={this.handlePress.bind(this)}>
          {this.props.children}
          <Text style={[text.bold, textColor]}>{this.props.label}</Text>
        </Button>
      </View>
    )
  }
}
