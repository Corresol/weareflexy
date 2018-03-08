import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import {
  em,
  text,
  colors
} from '../../styles'

import Button from '../Button'
import { ResponsiveImage } from '../Icons'

const styles = StyleSheet.create({
  holder: {
    flexGrow: 0,
    width: em(2.75)
  },
  icon: {
    flexGrow: 0,
    width: em(1.125)
  }
})

class Notification extends Component {
  render () {
    return (
      <Button
        action={this.props.action}
        localStyle={styles.holder}
        innerStyle={styles.icon}
        >
        <ResponsiveImage icon={'iconNotification'} />
        <Stamp amount={'1'} />
      </Button>
    )
  }
}

const stampStyles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: em(0.5),
    right: em(0.5) * -1,
    width: em(1.2),
    height: em(1.2),
    borderRadius: em(0.6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ui_2
  },
  label: {
    fontSize: em(0.75)
  }
})

const Stamp = (props) => {
  return (
    <View style={stampStyles.layout}>
      <Text style={[text.bold, stampStyles.label]}>{props.amount}</Text>
    </View>
  )
}

export default Notification
