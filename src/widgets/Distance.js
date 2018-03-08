import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import {
  em,
  colors
} from '../styles'

// import MapWidget from '../components/Map'
import RoundBlob from '../components/RoundBlob'
import TextBox from '../components/TextBox'
import { MapPin } from '../components/Icons'

const calcDistance = (lat1, lon1, lat2, lon2, unit) => {
  const radlat1 = Math.PI * lat1 / 180
  const radlat2 = Math.PI * lat2 / 180
  const theta = lon1 - lon2
  const radtheta = Math.PI * theta / 180

  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515

  if (unit === 'K') { dist = dist * 1.609344 }
  if (unit === 'N') { dist = dist * 0.8684 }

  return dist
}

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
  text: {
    color: colors.text_alternate
  },
  blob: {
    backgroundColor: 'rgb(255,255,255)',
    padding: em(0.75),
    marginBottom: em(1.3),
    overflow: 'hidden'
  },
  mapBlock: {
    top: 0,
    right: 0,
    bottom: 0,
    width: em(6),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class Distance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      distance: 0
    }

    this.mounted = false
  }

  componentDidMount () {
    console.log('i have mounted distance')
    this.mounted = true
  }

  componentWillMount () {
    this._getPosition()

    console.log('I am mounting distance')
  }

  componentWillUnmount () {
    this.mounted = false
    console.log('I am unmounting distance')
  }

  _getPosition = () => {
    const {
      locationId,
      locations
    } = this.props.job

    const jobLocation = locations[locationId]

    const {
      lat,
      lng
    } = jobLocation

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude
        } = position.coords

        const distance = calcDistance(lat, lng, latitude, longitude, 'K').toFixed(2)

        console.log('Distance result', distance, this.mounted)

        if (this.mounted) {
          this.setState({
            distance: distance
          })
        }
      },
      (error) => {
        console.log('Error', error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )
  }

  render () {
    const distance = `${this.state.distance}km away from you`

    // const {
    //   locationId,
    //   locations
    // } = this.props.job

    // const jobLocation = locations[locationId]

    // const mapProps = {
    //   latitude: jobLocation.lat,
    //   longitude: jobLocation.lng,
    //   address: `${jobLocation.address}, ${jobLocation.postcode}`
    // }

    return (
      <RoundBlob localStyle={styles.blob}>
        <TouchableHighlight
          onPress={this.props.action}
          underlayColor={'rgba(0,0,0,0)'}
        >
          <View style={styles.layout}>
            <View style={styles.inflexible}>
              <Icon />
            </View>
            <View style={styles.flexible}>
              <TextBox localStyle={[styles.text]}>{distance}</TextBox>
            </View>
          </View>
        </TouchableHighlight>
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
    backgroundColor: colors.ui_1
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: 17,
    height: 26
  }
})

const Icon = (props) => {
  return (
    <View style={iconStyles.layout}>
      <View style={iconStyles.icon}>
        <MapPin
          width={17}
          color={'rgb(255,255,255)'}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId]
  }
}

export default connect(mapStateToProps)(Distance)
