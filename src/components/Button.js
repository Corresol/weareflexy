import React, { Component } from 'react'
import {
  Keyboard,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  inner: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
})

export default class Button extends Component {
  handlePress () {
    Keyboard.dismiss()
    this.props.action && this.props.action()
  }

  render () {
    return (
      <TouchableHighlight
        style={[styles.layout, this.props.localStyle]}
        onPress={this.handlePress.bind(this)}
        underlayColor={'rgba(0,0,0,0)'}
        >
        <View style={[styles.inner, this.props.innerStyle]}>
          {this.props.children}
        </View>
      </TouchableHighlight>
    )
  }
}
