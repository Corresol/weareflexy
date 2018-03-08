import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

import {
  Vertical
} from '../containers/Grid'

import {
  em
} from '../styles'

import {
  prefetchJob
} from '../actions'

import Drawer from './Drawer'
import TextBox from '../components/TextBox'
import Background from '../components/Background'

import profileBasicNav from '../navigators/ProfileBasicNav'
import jobAlertNav from '../navigators/JobAlertNav'
import ModalButtonGreen from '../components/ModalButtonGreen'
import NotificationHeader from '../components/NotificationHeader'

const jobId = 'f95371e4-7b89-11e7-b0e3-ab7ca0ed7b5f'

class NotificationDrawer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notificationType: null
    }
  }

  _closeAction = () => {
    this.setState({
      notificationType: null
    })

    this.props.closeAction()
  }

  _closeDrawer = () => {
    this.props.showNotifications()
  }

  _launchView = (type) => {
    if (type === 'job') {
      this.props.prefetchJob(jobId)
        .then(result => {
          this.setState({
            notificationType: type
          })
        })
    } else {
      this.setState({
        notificationType: type
      })
    }
  }

  render () {
    let childView = <NotificationPane action={this._launchView} close={this._closeDrawer} />

    if (this.state.notificationType === 'profile') childView = <Profile drawer={this._closeDrawer} flow={this.props.flow} />

    if (this.state.notificationType === 'job') childView = <JobAlert drawer={this._closeDrawer} flow={'base'} />

    return (
      <Drawer open={this.props.notificationDrawer} closeAction={this._closeAction} >
        {childView}
      </Drawer>
    )
  }
}

const paneStyles = StyleSheet.create({
  layout: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'rgb(246,246,246)'
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch'
  },
  holder: {
    flexGrow: 0,
    height: em(6.75),
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(220,220,220)'
  }
})

class NotificationPane extends Component {
  render () {
    return (
      <Vertical localStyle={paneStyles.layout}>
        <Background
          background
        />
        <NotificationHeader action={this.props.close} />
        <ScrollView style={paneStyles.content}>
          <View style={paneStyles.content}>
            <NotificationButton
              message={'You have a profile update'}
              button={'View profile alert'}
              action={this.props.action.bind(this, 'profile')}
            />
            <NotificationButton
              message={'You have a new job alert'}
              button={'View job alert'}
              action={this.props.action.bind(this, 'job')}
            />
          </View>
        </ScrollView>
      </Vertical>
    )
  }
}

const buttonStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: em(1.125),
    paddingRight: em(1.125)
  },
  row: {

  },
  holder: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch'
  }
})

const NotificationButton = (props) => {
  return (
    <View style={buttonStyles.layout}>
      <View>
        <TextBox>{props.message}</TextBox>
      </View>
      <View style={buttonStyles.holder}>
        <ModalButtonGreen
          label={props.button}
          action={props.action}
        />
      </View>
    </View>
  )
}

class JobAlert extends Component {
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
      Navigator = jobAlertNav('', this.props.flow, true)
    } else {
      Navigator = jobAlertNav('', 'base', true)
    }

    return (
      <Navigator close drawer={this.props.drawer} />
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
      Navigator = profileBasicNav('', this.props.flow, true)
    } else {
      Navigator = profileBasicNav('', 'base', true)
    }

    return (
      <Navigator close drawer={this.props.drawer} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notificationDrawer: state.app.drawer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    prefetchJob: (jobId) => {
      return dispatch(prefetchJob(jobId))
    },
    showNotifications: () => {
      dispatch({
        type: 'APP_TOGGLE_DRAWER'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDrawer)
