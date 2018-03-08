import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

import {
  em
} from '../styles'

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch'
  },
  innerContent: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(1.25),
    paddingRight: em(1.25)
  }
})

class ScrollContainer extends Component {
  render () {
    return (
      <ScrollView style={styles.content}>
        <View style={[styles.innerContent, this.props.localStyle]}>
          {this.props.children}
        </View>
      </ScrollView>
    )
  }
}

export default ScrollContainer
