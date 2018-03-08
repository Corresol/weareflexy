import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  ScrollView
} from 'react-native'

import {
  em
} from '../styles'

import {
  CellCentered
} from '../containers/Cell'

const caddyStyle = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch',
    height: em(8),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  }
})

export default class Caddy extends Component {
  render () {
    const children = this.props.items.map((item, index) => {
      return (
        <Thumb key={index} source={{uri: item}} />
      )
    })

    return (
      <CellCentered localStyle={[caddyStyle.layout]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[caddyStyle.wrapper]}
        >
          {children}
        </ScrollView>
      </CellCentered>
    )
  }
}

const thumbStyle = StyleSheet.create({
  layout: {
    width: em(7),
    height: em(7),
    marginLeft: em(1),
    marginRight: em(1)
  },
  thumb: {
    width: em(7),
    height: em(7),
    borderRadius: em(0.75)
  }
})

class Thumb extends Component {
  render () {
    return (
      <View style={thumbStyle.layout}>
        <Image style={thumbStyle.thumb} source={this.props.source} />
      </View>
    )
  }
}
