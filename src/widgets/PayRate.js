import React, { Component } from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em,
  colors,
  text
} from '../styles'

import RoundBlob from '../components/RoundBlob'
import TextBox from '../components/TextBox'
import { ResponsiveImage } from '../components/Icons'

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  inflexible: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  flexible: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: em(1)
  },
  blob: {
    backgroundColor: colors.ui_1,
    padding: em(0.75),
    marginBottom: em(1.3)
  }
})

class PayRate extends Component {
  _calculate () {
    const job = this.props.job

    const hourlyRates = [job.hourlyRate, ...job.shifts.map((s) => s.hourlyRate)].filter((rate) => rate !== undefined)
    const multipleRates = !!hourlyRates.length
    const maxHourlyRate = hourlyRates.reduce((max, val) => val > max ? val : max, 0)

    const value = numeral(maxHourlyRate / 100).format('0.00')

    let rate = `£${value} per hour`

    if (multipleRates) rate = `Up to ${rate}`

    return rate
  }

  render () {
    const rate = this._calculate()

    return (
      <RoundBlob localStyle={styles.blob}>
        <View style={styles.layout}>
          <View style={styles.inflexible}>
            <Icon />
          </View>
          <View style={styles.flexible}>
            <TextBox localStyle={text.subtitle}>{rate}</TextBox>
          </View>
        </View>
      </RoundBlob>
    )
  }
}

const iconStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(3),
    height: em(3),
    borderRadius: em(1.5),
    backgroundColor: 'rgb(255,255,255)'
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: 26,
    height: 26
  }
})

const Icon = (props) => {
  return (
    <View style={iconStyles.layout}>
      <View style={iconStyles.icon}>
        <ResponsiveImage icon={'iconHourly'} />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId]
  }
}

export default connect(mapStateToProps)(PayRate)

// export default PayRate
