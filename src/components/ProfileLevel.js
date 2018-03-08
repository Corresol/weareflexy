import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import Svg, {
  ClipPath,
  Path,
  Rect
} from 'react-native-svg'

import TextBox from '../components/TextBox'

import {
  text,
  colors
} from '../styles'

const styles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-end'
  },
  level: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'rgba(255,255,255,0.3)'
  }
})

const defaultFill = colors.ui_2
const defaultBack = 'rgb(255,255,255)'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      percentage: props.percentage
    }
  }
  render () {
    const factor = 88 / 100
    const bottomY = this.props.percentage * factor

    const levelPos = {
      bottom: bottomY
    }

    const fillColor = this.props.fillColor || defaultFill
    const backColor = this.props.backColor || defaultBack

    return (
      <View style={[styles.layout, this.props.localStyle]}>
        <View style={[styles.level, levelPos]}>
          <Level
            percentage={this.props.percentage}
            title={this.props.title}
          />
        </View>
        <View style={styles.icon}>
          <ProfileStatus
            fillColor={fillColor}
            backColor={backColor}
            percentage={this.props.percentage}
            width={100}
            height={88}
          />
        </View>
      </View>
    )
  }
}

const Level = (props) => {
  return (
    <View>
      <TextBox localStyle={text.subtitle}>Profile status</TextBox>
      <TextBox>{props.title} - {props.percentage}%</TextBox>
    </View>
  )
}

const ProfileStatus = (props) => {
  const factor = 88 / 100

  const backColor = props.backColor
  const fillColor = props.fillColor
  const posY = 88 - (props.percentage * factor)
  const height = props.percentage * factor

  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox={'0 0 100 88'}
      preserveAspectRatio={'xMinYMin meet'}
    >
      <ClipPath
        id={'clip'}
      >
        <Path
          d={'M33.39,81a6.71,6.71,0,0,1,2.89-4.76c.18-.12.24-.45.31-.7.44-1.77.88-3.55,1.29-5.33a1.09,1.09,0,0,0-.14-.77q-2.06-3-4.17-6A1.36,1.36,0,0,0,32.9,63a10.72,10.72,0,0,1-2.15-.61A10.54,10.54,0,0,1,25.19,53c-.06-2.2.89-3.14,3.14-3.51a21.27,21.27,0,0,1-1.11-11.93l-1.87,2.17a13,13,0,0,1,.94-6.7,10.87,10.87,0,0,1,6.44-5.88C32,25.6,30.65,25,29,24.48c1.87-.18,2.92.21,4.67,1.67-.26-1.7-.64-3.37.07-5a6.48,6.48,0,0,0,.76,3.29,11.38,11.38,0,0,1,5.39-5.83c4.41-2.32,9.11-2.31,13.87-1.66-2.16.06-5.52,1.59-6.49,2.86A20.88,20.88,0,0,1,57,18.47c3.75.46,7.26,2.32,8.53,4.35-.58-.24-1.15-.5-1.74-.7s-1.2-.32-1.8-.47A26,26,0,0,1,71.86,30a17,17,0,0,1,2.67,12.55l-.65-2.33a30.69,30.69,0,0,1-1.57,9.32c2.19.79,2.62,2.52,2.42,4.43A11.27,11.27,0,0,1,71,61.21a5.8,5.8,0,0,1-4,1.8.86.86,0,0,0-.55.39q-2.11,3-4.18,6.09a1,1,0,0,0-.1.78,17.89,17.89,0,0,1,1.28,5.34,1,1,0,0,0,.35.68,6.85,6.85,0,0,1,2.9,4.85,1.14,1.14,0,0,0,1,1.08,62,62,0,0,1,14.76,5.88,50,50,0,1,0-64.74,0,62.13,62.13,0,0,1,14.64-5.85A1.3,1.3,0,0,0,33.39,81Z'}
          fill={'black'}
          stroke={'none'}
        />
      </ClipPath>
      <Rect
        x={0}
        y={0}
        width={100}
        height={100}
        fill={backColor}
        clipPath={'url(#clip)'}
      />
      <Rect
        x={0}
        y={posY}
        width={100}
        height={height}
        fill={fillColor}
        clipPath={'url(#clip)'}
      />
    </Svg>
  )
}

export default Profile
