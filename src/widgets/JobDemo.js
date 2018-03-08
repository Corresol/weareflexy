import React, { Component } from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import RoundBlob from '../components/RoundBlob'
import TextBox from '../components/TextBox'
import { ResponsiveImage } from '../components/Icons'

import {
  em
} from '../styles'

const styles = StyleSheet.create({
  jobRow: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: em(1),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)'
  },
  jobRowIcon: {
    flexGrow: 0,
    flexShrink: 0,
    width: em(1.7),
    height: em(1.7),
    marginRight: em(1)
  },
  jobRowText: {
    alignSelf: 'center'
  }
})

export default class JobDemo extends Component {
  render () {
    return (
      <RoundBlob>
        <View style={styles.jobRow}>
          <View style={styles.jobRowIcon}>
            <ResponsiveImage icon={'iconJobSmall'} />
          </View>
          <TextBox localStyle={styles.jobRowText}>Jobs available near your location:</TextBox>
        </View>
      </RoundBlob>
    )
  }
}
