import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import Svg, {
  Polygon
} from 'react-native-svg'

import {
  em
} from '../styles'

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    marginBottom: em(0.5)
  }
})

class Rating extends Component {
  _renderStars = () => {
    let stars = []

    for (let x = 0; x < 5; x++) {
      let style = x > this.props.rating - 1 ? this.props.inactive : this.props.active

      stars.push(<Star color={style} key={x} />)
    }

    return stars
  }

  render () {
    return (
      <View style={styles.layout}>
        {this._renderStars()}
      </View>
    )
  }
}

const Star = (props) => {
  return (
    <Svg
      width={14}
      height={14}
      viewBox={'0 0 40 38.04'}
      preserveAspectRatio={'xMinYMin meet'}
    >
      <Polygon
        fill={props.color}
        points={'20 31.54 7.64 38.04 10 24.28 0 14.53 13.82 12.52 20 0 26.18 12.52 40 14.53 30 24.28 32.36 38.04 20 31.54'}
      />
    </Svg>
  )
}

export default Rating
