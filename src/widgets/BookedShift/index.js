import React, { Component } from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em,
  colors
} from '../../styles'

import RoundBlob from '../../components/RoundBlob'
import Destination from './Destination'
import Details from './Details'
import Amount from './Amount'

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  row: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  text: {
    color: colors.text_alternate,
    fontSize: em(0.65),
    flexGrow: 1,
    alignSelf: 'stretch',
    textAlign: 'left'
  },
  blob: {
    flexGrow: 0,
    backgroundColor: 'rgb(255,255,255)',
    padding: em(0.75),
    marginBottom: em(1.3)
  }
})

class Shifts extends Component {
  render () {
    return (
      <RoundBlob localStyle={[styles.blob]}>
        <View style={styles.layout}>
          <View style={styles.row}>
            <Destination
              location={this.props.location}
            />
            <Amount
              amount={this.props.amount}
            />
          </View>
          <Details
            days={this.props.days}
            hours={this.props.hours}
          />
        </View>
      </RoundBlob>
    )
  }
}

export default Shifts
