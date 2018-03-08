import React, { Component } from 'react'
import {
  View
} from 'react-native'

import {
  grid
} from '../styles'

class Horizontal extends Component {
  render () {
    return (
      <View style={[grid.horizontalGrid, this.props.localStyle]}>
        {this.props.children}
      </View>
    )
  }
}

class Vertical extends Component {
  render () {
    return (
      <View style={[grid.verticalGrid, this.props.localStyle]}>
        {this.props.children}
      </View>
    )
  }
}

export {
  Horizontal,
  Vertical
}
