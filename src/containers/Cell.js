import React, { Component } from 'react'
import {
  View
} from 'react-native'

import {
  grid
} from '../styles'

class CellCentered extends Component {
  render () {
    return (
      <View style={[grid.centeredCell, this.props.localStyle]}>
        {this.props.children}
      </View>
    )
  }
}

class CellStart extends Component {
  render () {
    return (
      <View style={[grid.startCell, this.props.localStyle]}>
        {this.props.children}
      </View>
    )
  }
}

class CellSpread extends Component {
  render () {
    return (
      <View style={[grid.spreadCell, this.props.localStyle]}>
        {this.props.children}
      </View>
    )
  }
}

export {
  CellCentered,
  CellStart,
  CellSpread
}
