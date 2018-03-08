import React, { Component } from 'react'
import {
  TextInput
} from 'react-native'

const style = {
  alignSelf: 'stretch',
  flexGrow: 1,
  flexShrink: 1
}

export default class Field extends Component {
  render () {
    return (
      <TextInput
        {...this.props}
        ref={(input) => { this._input = input }}
        style={[style, this.props.localStyle]}
        selectionColor={'rgb(255,255,255)'}
        underlineColorAndroid={'rgba(0,0,0,0)'}
      />
    )
  }
}
