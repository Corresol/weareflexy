import React from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import { ResponsiveImage } from './Icons'

import {
  em
} from '../styles'

const iconStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(9.5),
    height: em(9.5)
  },
  outer: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(9.5),
    height: em(9.5),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgb(255,255,255)',
    borderRadius: em(0.5)
  },
  inner: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(8.5),
    height: em(8.5),
    borderRadius: em(0.5),
    backgroundColor: 'rgb(255,255,255)',
    overflow: 'hidden'
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: em(3.75),
    aspectRatio: 1
  },
  image: {
    flexGrow: 0,
    flexShrink: 0,
    width: em(13.75),
    aspectRatio: 1
  }
})

const UploadIcon = (props) => {
  const imageStyle = props.active ? iconStyles.image : iconStyles.icon

  return (
    <View style={iconStyles.layout}>
      <View style={iconStyles.outer}>
        <TouchableHighlight
          onPress={props.action}
          underlayColor={'rgba(0,0,0,0)'}
          >
          <View style={iconStyles.inner}>
            <View style={imageStyle}>
              <ResponsiveImage icon={props.image} />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default UploadIcon
