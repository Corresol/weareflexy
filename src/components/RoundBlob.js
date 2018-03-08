import React from 'React'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em
} from '../styles'

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: em(1),
    padding: em(1),
    alignSelf: 'stretch',
    borderRadius: em(0.5)
  }
})

const RoundBlob = (props) => {
  return (
    <View style={[styles.layout, props.localStyle]}>
      {props.children}
    </View>
  )
}

export default RoundBlob
