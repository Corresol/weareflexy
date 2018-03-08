import React, { Component } from 'react'
import MapView from 'react-native-maps'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em,
  colors
} from '../styles'

import TextBox from './TextBox'
import { MapPin } from './Icons'

const regionFrom = (lat, lon, distance) => {
  distance = distance / 2
  const circumference = 40075
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000
  const angularDistance = distance / circumference

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
  const longitudeDelta = Math.abs(Math.atan2(
          Math.sin(angularDistance) * Math.cos(lat),
          Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta,
    longitudeDelta
  }
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch'
  }
})

class MapWidget extends Component {
  constructor (props) {
    super(props)

    const location = regionFrom(props.latitude, props.longitude, 100)

    this.state = {
      location: location,
      address: props.address,
      updated: false
    }
  }

  _getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude
        } = position.coords

        const location = regionFrom(latitude, longitude, 100)

        console.log('Location', location)

        this.setState({
          location: location
        })
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

  _onMapReady = () => {
    console.log('Map is ready to accept input')
    // this._getPosition()
  }

  _onRegionChange = (location) => {
    this.setState({
      location: location
    })
  }

  render () {
    return (
      <MapView
        style={styles.layout}
        region={this.state.location}
        onMapReady={this._onMapReady}
        showsUserLocation
        showsMyLocationButton={false}
      >
        <Marker
          label={this.state.address}
          location={this.state.location}
        />
      </MapView>
    )
  }
}

const Marker = (props) => {
  const location = {
    latitude: props.location.latitude,
    longitude: props.location.longitude
  }

  return (
    <MapView.Marker
      coordinate={location}
      showsUserLocation
      centerOffset={{
        x: 0,
        y: em(-2)
      }}
      calloutOffset={{
        x: em(-5.5),
        y: em(4)
      }}
      calloutAnchor={{
        x: em(-5.5),
        y: em(4)
      }}
    >
      <Icon />
      <MapView.Callout
        tooltip
      >
        <CallOut
          label={props.label}
        />
      </MapView.Callout>
    </MapView.Marker>
  )
}

const iconStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(3.2),
    height: em(3.2),
    borderWidth: 2,
    borderColor: 'rgb(255,255,255)',
    borderRadius: em(1.6),
    backgroundColor: colors.ui_2,
    zIndex: 2
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: em(1),
    height: em(1.5)
  }
})

const Icon = (props) => {
  return (
    <View style={iconStyles.layout}>
      <View style={iconStyles.icon}>
        <MapPin
          width={em(1)}
          color={'rgb(255,255,255)'}
        />
      </View>
    </View>
  )
}

const callStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    width: em(12),
    height: em(3.5),
    padding: em(0.25),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: em(1.75),
    backgroundColor: 'rgb(255,255,255)'
  },
  text: {
    fontSize: em(0.75),
    color: colors.ui_1,
    flexGrow: 0,
    alignSelf: 'flex-end',
    marginRight: em(3.5)
  }
})

const CallOut = (props) => {
  return (
    <View style={callStyles.layout}>
      <TextBox localStyle={callStyles.text}>{props.label}</TextBox>
    </View>
  )
}

export default MapWidget
