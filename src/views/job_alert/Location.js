import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  StyleSheet
} from 'react-native'

import JobOverview from '../../widgets/JobOverview'

import MapWidget from '../../components/Map'

import {
  Vertical
} from '../../containers/Grid'

import {
  CellCentered
} from '../../containers/Cell'

import {
  em
} from '../../styles'

const styles = StyleSheet.create({
  layout: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'rgb(246,246,246)'
  },
  container: {
    flexGrow: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch'
  },
  innerContent: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(1.25),
    paddingRight: em(1.25)
  },
  holder: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexGrow: 0,
    height: em(6.75),
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(220,220,220)'
  },
  button: {
    flexGrow: 1,
    alignSelf: 'center',
    margin: em(0.25)
  },
  map: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch'
  }
})

class Location extends Component {
  static viewMenuTitle = 'Job location'
  static showHeader = true
  static headerType = 'titleNoLogo'

  render () {
    const {
      locationId,
      locations
    } = this.props.job

    const jobLocation = locations[locationId]

    const mapProps = {
      latitude: jobLocation.lat,
      longitude: jobLocation.lng,
      address: `${jobLocation.address}, ${jobLocation.postcode}`
    }

    return (
      <Vertical localStyle={styles.layout}>
        <CellCentered localStyle={[styles.container]}>
          <JobOverview
            noAction
            mode={'color'}
          />
        </CellCentered>
        <MapWidget
          {...mapProps}
        />
      </Vertical>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId]
  }
}

export default connect(mapStateToProps)(Location)
