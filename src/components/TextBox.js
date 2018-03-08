import React, { Component } from 'react'
import {
  Text
} from 'react-native'

import {
  text
} from '../styles'

let style = {
  alignSelf: 'stretch'
}

export default class TextBox extends Component {
  render () {
    let props = {}

    if (this.props.numberOfLines) {
      props.numberOfLines = this.props.numberOfLines
    }

    return (
      <Text style={[text.bold, style, this.props.localStyle]} {...props}>
        {this.props.children}
      </Text>
    )
  }
}
