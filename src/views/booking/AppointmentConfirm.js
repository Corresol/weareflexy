import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'

import {
  setAccountReady
} from '../../actions'

import {
  CellStart,
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import ModalButtonWhite from '../../components/ModalButtonWhite'
import TextBox from '../../components/TextBox'

import {
  colors,
  em,
  text
} from '../../styles'

const styles = StyleSheet.create({
  holder: {
    flexGrow: 0,
    height: em(6.75)
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: em(0.5)
  },
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  },
  message: {
    textAlign: 'center',
    marginBottom: em(0.5)
  },
  time: {
    marginTop: em(0.25)
  }
})

const calendarConfig = {
  sameDay: '[Today], dddd',
  lastDay: '[Yesterday], dddd',
  lastWeek: '[Last], dddd',
  nextDay: '[Tomorrow], dddd'
}

const filterAppointment = (list, id) => {
  return list[id]
}

class AppointmentConfirm extends Component {
  static viewMenuTitle = "We're done. Thank you!"
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      ghosted: true,
      callType: 'whatsapp',
      contact: ''
    }

    this.complete = this.complete.bind(this)
  }

  complete () {
    this.props.confirm()
      .then(() => {
        this.props.drawer()
      })
  }

  render () {
    const {
      byId,
      bookedAppointmentId
    } = this.props.appointments

    const appointment = filterAppointment(byId, bookedAppointmentId)

    const {
      startTime,
      endTime,
      operator,
      platform
    } = appointment

    const date = moment(startTime).format('Do MMMM')
    const day = moment(startTime).calendar(null, calendarConfig)
    const time = `${moment(startTime).format('HH:mm')} - ${moment(endTime).format('HH:mm')}`
    const checker = `${operator.firstName} ${operator.lastName}`

    return (
      <Vertical>
        <CellStart>
          <Icon />
          <TextBox localStyle={[styles.message, text.subtitle]}>{date}</TextBox>
          <TextBox localStyle={[styles.message]}>{day}</TextBox>
          <TextBox localStyle={[styles.message, styles.time, text.title]}>{time}</TextBox>
        </CellStart>
        <CellCentered>
          <MugShot />
          <TextBox localStyle={[styles.message, text.subtitle]}>{checker}</TextBox>
          <TextBox localStyle={[styles.message]}>will be the Flexy staff checker you'll be having a {platform} call with</TextBox>
        </CellCentered>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonWhite
            localStyle={styles.button}
            label={'Ok. Thank you'}
            action={this.complete}
          />
        </CellCentered>
      </Vertical>
    )
  }
}

const iconStyles = {
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    width: em(5.5),
    height: em(5.5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainField: {
    flexGrow: 0,
    flexShrink: 0,
    width: em(4.5),
    height: em(4.5),
    backgroundColor: colors.ui_2,
    borderRadius: em(2.25),
    alignItems: 'center',
    justifyContent: 'center'
  },
  calendar: {
    width: 29,
    height: 32
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: em(2),
    height: em(2),
    backgroundColor: colors.complete,
    borderRadius: em(2.25),
    alignItems: 'center',
    justifyContent: 'center'
  },
  tick: {
    width: 18,
    height: 14
  }
}

const Icon = (props) => {
  return (
    <View style={iconStyles.layout}>
      <View style={iconStyles.mainField}>
        <Image
          source={require('../../../assets/png/icon_calendar_white_large/icon.png')}
          style={iconStyles.calendar}
        />
      </View>
      <View style={iconStyles.badge}>
        <Image
          source={require('../../../assets/png/icon_complete/icon.png')}
          style={iconStyles.tick}
        />
      </View>
    </View>
  )
}

const MugShot = (props) => {
  return (
    <Image
      source={require('../../../assets/png/image_checker/image.png')}
      style={{
        width: em(7),
        height: em(7),
        borderRadius: em(3.5),
        marginBottom: em(1)
      }}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    confirm: () => {
      return dispatch(setAccountReady())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentConfirm)
