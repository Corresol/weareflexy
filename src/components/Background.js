import React, { Component } from 'react'

import {
  View,
  Image,
  Dimensions
} from 'react-native'

import {
  grid
} from '../styles'

const blue = require('../../assets/png/background_blue/background.png')
const colour = require('../../assets/png/background_colour/background.png')

class Background extends Component {
  constructor (props) {
    super(props)

    const nominalWidth = 375
    const nominalHeight = 667

    let deviceWidth = Dimensions.get('window').width

    this.width = deviceWidth

    this.height = (deviceWidth / nominalWidth) * nominalHeight
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.background !== this.props.background) {
      console.log('Trigger background change')
    }
  }

  render () {
    return (
      <View style={[grid.frame]}>
        <BackgroundBlue width={this.width} height={this.height} />
        {this.props.background && <BackgroundColour width={this.width} height={this.height} />}
      </View>
    )
  }
}

const absolute = {
  position: 'absolute',
  top: 0,
  left: 0
}

const BackgroundBlue = (props) => {
  return (
    <Image
      source={blue}
      style={[absolute, {width: props.width, height: props.height}]}
    />
  )
}

const BackgroundColour = (props) => {
  return (
    <Image
      source={colour}
      style={[absolute, {width: props.width, height: props.height}]}
    />
  )
}

export default Background
