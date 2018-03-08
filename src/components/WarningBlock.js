import React from 'React'

import {
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native'

import TextBox from './TextBox'

import {
  em,
  colors
} from '../styles'

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch'
  },
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    padding: em(2),
    backgroundColor: 'rgb(255,255,255)',
    alignSelf: 'stretch'
  },
  wrapper: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  title: {
    color: colors.text_light_grey,
    fontSize: em(1.5),
    marginBottom: em(0.75)
  },
  message: {
    color: colors.text_light_grey
  }
})

const WarningBlock = (props) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={props.action}
      underlayColor={'rgba(0,0,0,0)'}
    >
      <View style={[styles.layout, props.localStyle]}>
        {props.children}
        <View style={styles.wrapper}>
          {props.title && <TextBox localStyle={styles.title}>{props.title}</TextBox>}
          <TextBox localStyle={styles.message}>{props.message}</TextBox>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default WarningBlock
