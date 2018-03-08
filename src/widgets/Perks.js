import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    alignSelf: 'stretch',
    marginBottom: em(0.25)
  },
  inflexible: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  text: {
    color: colors.text_alternate,
    lineHeight: em(1.125)
  },
  blob: {
    backgroundColor: 'rgb(255,255,255)',
    paddingTop: em(0.75),
    paddingLeft: em(0.75),
    paddingRight: em(0.75),
    paddingBottom: em(0.5),
    marginBottom: em(1.3)
  }
})

class Perks extends Component {
  render () {
    const {
      bonusCommissionEnabled,
      unpaidBreakEnabled
    } = this.props.job

    return (
      <RoundBlob localStyle={styles.blob}>
        {bonusCommissionEnabled &&
          <Row
            icon={'iconCommision'}
            text={this.props.job.bonusCommissionPolicy}
          />
        }
        {unpaidBreakEnabled &&
          <Row
            icon={'iconLunch'}
            text={this.props.Job.unpaidBreakPolicy}
          />
        }
        <Row
          icon={'iconHoursType'}
          text={'Part-time'}
          message={'Week days only. Morning hours'}
        />
      </RoundBlob>
    )
  }
}

const Row = (props) => {
  return (
    <View style={styles.layout}>
      <View style={styles.inflexible}>
        <Icon icon={props.icon} />
      </View>
      <View style={styles.flexible}>
        <TextBox localStyle={[styles.text]}>{props.text}</TextBox>
        {props.message && <TextBox localStyle={[text.normal, styles.text]}>{props.message}</TextBox>}
      </View>
    </View>
  )
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
        <ResponsiveImage icon={props.icon} />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId]
  }
}

export default connect(mapStateToProps)(Perks)
