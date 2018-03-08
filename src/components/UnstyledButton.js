import React, { Component } from 'react'
import {
  TouchableHighlight
} from 'react-native'

export default class UnstyledButton extends Component {
  render () {
    return (
      <TouchableHighlight
        style={this.props.style}
        onPress={this.props.action}
        underlayColor={'rgba(0,0,0,0)'}
        >
        {this.props.children}
      </TouchableHighlight>
    )
  }
}
