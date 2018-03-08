import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import TextBox from './TextBox'
import { ResponsiveImage } from './Icons'

import {
  text,
  colors,
  em
} from '../styles'

const stylesWhite = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: 27,
    marginRight: em(1)
  },
  text: {
    flexGrow: 1,
    flexShrink: 1
  },
  title: {
    color: 'rgb(255,255,255)'
  },
  next: {
    flexGrow: 0,
    flexShrink: 0,
    width: 10
  }
})

const stylesColor = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: 27,
    marginRight: em(1)
  },
  text: {
    flexGrow: 1,
    flexShrink: 1
  },
  title: {
    color: colors.text_alternate
  },
  next: {
    flexGrow: 0,
    flexShrink: 0,
    width: 10
  }
})

class FAQButton extends Component {
  render () {
    const styles = this.props.mode === 'color' ? stylesColor : stylesWhite
    const FAQIcon = this.props.mode === 'color' ? 'iconFAQOrange' : 'iconFAQ'
    const next = this.props.mode === 'color' ? 'iconForwardBlack' : 'iconForwardWhite'

    return (
      <TouchableHighlight
        onPress={this.props.action}
        underlayColor={'rgba(0,0,0,0)'}
      >
        <View style={styles.layout}>
          <View style={styles.icon}>
            <ResponsiveImage icon={FAQIcon} />
          </View>
          <View style={styles.text}>
            <TextBox localStyle={[text.subtitle, styles.title]}>Frequently asked questions</TextBox>
          </View>
          <View style={styles.next}>
            <ResponsiveImage icon={next} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default FAQButton
