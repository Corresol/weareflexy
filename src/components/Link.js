import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'

import {
  em,
  text
} from '../styles'

// const style = {
//   flexDirection: 'row',
//   flexGrow: 0,
//   alignItems: 'flex-start',
//   justifyContent: 'flex-start',
//   alignSelf: 'stretch',
//   marginBottom: em(2)
// }

const styles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: em(1)
  },
  wrapper: {
    flexDirection: 'row',
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
})

export default class Link extends Component {
  render () {
    return (
      <TouchableHighlight
        style={styles.layout}
        underlayColor={'rgba(0,0,0,0)'}
        onPress={this.props.action}
      >
        <View style={[styles.wrapper, this.props.style]}>
          <Text style={text.link}>{this.props.label}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
