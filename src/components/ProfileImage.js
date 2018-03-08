import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  StyleSheet
} from 'react-native'

import { ResponsiveImage } from './Icons'

import {
  em
} from '../styles'

const logo = require('../../assets/png/logo_small/logo.png')

const styles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class ProfileImage extends Component {
  render () {
    let borderSize = em(this.props.size)
    let innerSize = borderSize * 0.85

    const {
      photo,
      pendingPhoto
    } = this.props.account

    const image = photo || pendingPhoto

    const style = {
      width: borderSize,
      aspectRatio: 1
    }

    if (this.props.border) {
      return (
        <View style={[styles.layout, style]}>
          <Border size={borderSize}>
            <Picture size={innerSize} url={image} />
          </Border>
          {this.props.logo && <LogoBadge />}
        </View>
      )
    }

    innerSize = borderSize

    return (
      <View style={[styles.layout, style]}>
        <Picture size={innerSize} url={image} />
      </View>
    )
  }
}

const badgeStyle = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    left: em(-1),
    width: em(2),
    height: em(2)
  }
})

const LogoBadge = (props) => {
  return (
    <View style={badgeStyle.layout}>
      <ResponsiveImage icon={logo} />
    </View>
  )
}

const pictureStyle = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255,255,255)',
    overflow: 'hidden'
  },
  image: {
    flexGrow: 0,
    flexShrink: 0,
    aspectRatio: 1
  }
})

const Picture = (props) => {
  const image = {uri: props.url}

  const outerSize = props.size
  const imageSize = props.size * 1.5

  const outerStyle = {
    width: outerSize,
    height: outerSize,
    borderRadius: outerSize / 2
  }

  const imageStyle = {
    width: imageSize
  }

  return (
    <View style={[pictureStyle.layout, outerStyle]}>
      <View style={[pictureStyle.image, imageStyle]}>
        <ResponsiveImage icon={image} />
      </View>
    </View>
  )
}

const borderStyle = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgb(255,255,255)'
  }
})

const Border = (props) => {
  const style = {
    width: props.size,
    height: props.size,
    borderRadius: props.size / 2
  }

  return (
    <View style={[borderStyle.layout, style]}>
      {props.children}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    account: state.workerAccount
  }
}

export default connect(mapStateToProps)(ProfileImage)
