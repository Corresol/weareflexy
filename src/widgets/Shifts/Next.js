import React, { Component } from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  ResponsiveImage
} from '../../components/Icons'

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: 10
  }
})

export default class Next extends Component {
  render () {
    const type = this.props.type

    const icon = type === 'selected' ? 'iconForwardWhite' : 'iconForwardBlack'

    return (
      <View style={styles.layout}>
        <ResponsiveImage icon={icon} />
      </View>
    )
  }
}
