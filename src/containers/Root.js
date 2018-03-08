import React, { Component } from 'react'
import {
  StatusBar
} from 'react-native'

import { connect } from 'react-redux'

import Frame from './Frame'
import Drawer from './Drawer'

import getRoot from '../navigators/RootNav'

import infoNav from '../navigators/InfoNav'
import bookingNav from '../navigators/BookingNav'

class Root extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      reset: []
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.open !== this.state.open) {
      return true
    }

    if (nextProps.stage !== this.props.stage) {
      return true
    }

    return false
  }

  componentWillReceiveProps (nextProps) {
    console.log('Root is updating')
  }

  showDrawer = () => {
    const current = this.state.open

    this.setState({
      open: !current
    })
  }

  render () {
    const passProps = {
      drawer: this.showDrawer,
      close: true
    }

    const stage = this.props.stage

    return (
      <Frame>
        <StatusBar
          barStyle={'light-content'}
        />
        <RootNav stage={stage} drawer={this.showDrawer} />
        <Drawer open={this.state.open}>
          <Inner stage={stage} passProps={passProps} />
        </Drawer>
      </Frame>
    )
  }
}

const info = [
  'awaitingPhoneVerified',
  'phoneVerified'
]

const booking = [
  'appointmentPending',
  'appointmentBooked',
  'idSent',
  'appointmentReady'
]

const profileBasic = [
  'loggedIn'
]

const mapComponents = {
  info,
  booking,
  profileBasic
}

class Inner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      current: 'info'
    }
  }

  componentWillMount () {
    this._getComponent(this.props.stage)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.current !== this.state.current) {
      return true
    }

    return false
  }

  componentWillReceiveProps (nextProps) {
    this._getComponent(nextProps.stage)
  }

  _getComponent = (stage) => {
    let current = 'info'

    for (let key in mapComponents) {
      let found = mapComponents[key].find(item => item === stage)

      if (found) current = key
    }

    this.setState({
      current: current
    })
  }

  render () {
    let navigator

    switch (this.state.current) {
      case 'info':
        navigator = infoNav
        break
      case 'booking':
        navigator = bookingNav
        break
      case 'profileBasic':
        navigator = null
        break
      default: navigator = infoNav
    }

    if (navigator) {
      const Navigator = navigator(this.props.stage)

      return <Navigator {...this.props.passProps} />
    } else {
      return null
    }
  }
}

class RootNav extends Component {
  shouldComponentUpdate (nextProps) {
    if (nextProps.stage !== this.props.stage) {
      return true
    }

    return false
  }

  render () {
    const Navigator = getRoot(this.props.stage)

    return <Navigator drawer={this.props.drawer} close={false} />
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.appCache.stage
  }
}

export default connect(mapStateToProps)(Root)
