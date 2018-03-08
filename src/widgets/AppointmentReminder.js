import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  colors,
  em,
  text
} from '../styles'

import {
  Horizontal,
  Vertical
} from '../containers/Grid'

import TextBox from '../components/TextBox'

import {
  ResponsiveImage
} from '../components/Icons'

const styles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    paddingTop: em(1.25),
    paddingBottom: em(1.25),
    paddingLeft: em(1),
    paddingRight: em(1),
    backgroundColor: 'rgb(255,255,255)'
  },
  title: {
    color: colors.ui_2
  },
  date: {
    color: colors.text_alternate,
    fontSize: em(1.125),
    marginTop: em(0.5),
    marginBottom: em(0.5)
  },
  time: {
    color: colors.text_alternate,
    fontSize: em(0.8)
  },
  iconBack: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(3),
    height: em(3),
    marginLeft: em(1),
    marginRight: em(1),
    backgroundColor: colors.ui_2,
    borderRadius: em(1.5)
  },
  icon: {
    flexGrow: 1,
    width: em(1.25)
  }
})

const filterAppointment = (list, id) => {
  return list[id]
}

class AppointmentReminder extends Component {
  render () {
    const {
      byId,
      bookedAppointmentId
    } = this.props.appointments

    const appointment = filterAppointment(byId, bookedAppointmentId)

    let date
    let time

    if (appointment) {
      date = moment(appointment.startTime).format('dddd Do MMMM')
      time = `${moment(appointment.startTime).format('HH:mm')} - ${moment(appointment.endTime).format('HH:mm')}`
    }

    return (
      <Horizontal localStyle={styles.layout}>
        <Calendar />
        <Vertical>
          <TextBox localStyle={styles.title}>Your booked appointment</TextBox>
          <View>
            <TextBox localStyle={styles.date}>{date}</TextBox>
            <TextBox localStyle={[text.normal, styles.time]}>{time}</TextBox>
          </View>
        </Vertical>
      </Horizontal>
    )
  }
}

const Calendar = (props) => {
  return (
    <View style={styles.iconBack}>
      <View style={styles.icon}>
        <ResponsiveImage icon={'iconCalendarWhite'} />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments
  }
}

export default connect(mapStateToProps)(AppointmentReminder)
