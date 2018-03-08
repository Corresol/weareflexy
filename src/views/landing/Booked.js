import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  StyleSheet
} from 'react-native'

import AppointmentReminder from '../../widgets/AppointmentReminder'
import CompleteProfile from '../../widgets/CompleteProfile'
import JobDemo from '../../widgets/JobDemo'

import {
  Vertical
} from '../../containers/Grid'

import {
  CellStart,
  CellCentered
} from '../../containers/Cell'

import {
  em
} from '../../styles'

import profileBasicNav from '../../navigators/ProfileBasicNav'
import Drawer from '../../containers/Drawer'
import NotificationDrawer from '../../containers/NotificationDrawer'

const styles = StyleSheet.create({
  container: {
    paddingTop: em(1),
    paddingBottom: em(1),
    backgroundColor: 'rgb(246,246,246)'
  },
  noFlex: {
    flexGrow: 0
  },
  altPadding: {
    paddingLeft: em(1.25),
    paddingRight: em(1.25)
  }
})

class Booked extends Component {
  static viewMenuTitle = 'Welcome to Flexy!'
  static showHeader = true
  static headerType = 'landing'

  constructor (props) {
    super(props)

    this.state = {
      profileOpen: false,
      notificationsOpen: false,
      viewed: false
    }
  }

  _goProfile = () => {
    this.props.drawer()
  }

  _profileAction = () => {
    const {
      personalStatement
    } = this.props.worker

    const {
      navigate
    } = this.props.navigation

    if (personalStatement) {
      navigate('Profile')
    } else {
      this._openDrawer()
    }

    this._openDrawer()
  }

  _openDrawer = (post) => {
    if (post && !post.nativeEvent) {
      console.log('Post action', post)
    }

    const open = this.state.profileOpen

    this.setState({
      profileOpen: !open
    })
  }

  // Mock for notification state
  _setViewed = () => {
    this.setState({
      viewed: true
    })
  }

  render () {
    const {
      photo,
      pendingPhoto,
      personalStatement
    } = this.props.worker

    let flow = 'base'

    if (this.state.viewed) flow = 'viewed'

    if (photo || pendingPhoto) flow = 'statement'

    if (personalStatement) flow = 'complete'

    return (
      <Vertical>
        <AppointmentReminder />
        <Vertical localStyle={styles.container}>
          <CellStart localStyle={[styles.noFlex, styles.altPadding]}>
            <CompleteProfile action={this._profileAction} />
          </CellStart>
          <CellCentered localStyle={[styles.altPadding]}>
            <JobDemo />
          </CellCentered>
        </Vertical>
        <Drawer open={this.state.profileOpen}>
          <Profile flow={flow} worker={this.props.worker} drawer={this._openDrawer} />
        </Drawer>
        <NotificationDrawer flow={flow} closeAction={this._setViewed} />
      </Vertical>
    )
  }
}

class Profile extends Component {
  shouldComponentUpdate (nextProps) {
    if (nextProps.flow !== this.props.flow) {
      console.log('Updating component')
      return true
    }

    return false
  }

  render () {
    let Navigator = null

    if (this.props.flow) {
      Navigator = profileBasicNav('', this.props.flow, false)
    } else {
      Navigator = profileBasicNav('', 'base', false)
    }

    return (
      <Navigator close drawer={this.props.drawer} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    worker: state.workerAccount,
    notificationDrawer: state.app.drawer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showNotifications: () => {
      dispatch({
        type: 'APP_TOGGLE_DRAWER'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booked)
