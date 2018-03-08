import React, { Component } from 'React'

import {
  View,
  PanResponder
} from 'react-native'

class PanOverride extends Component {
  render () {
    const responder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gesture) => {
        console.log('Trying to override')

        return true
      }
    })

    return (
      <View {...responder.panHandlers} style={this.props.style}>
        {this.props.children}
      </View>
    )
  }
}

export default PanOverride
