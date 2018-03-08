import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  getAppointments
} from '../actions'

import {
  colors,
  vw,
  em
} from '../styles'

import Button from './Button'
import TextBox from './TextBox'
import { ResponsiveImage } from './Icons'

const calendarStyles = StyleSheet.create({
  layout: {
    flex: 1,
    alignSelf: 'stretch'
  },
  title: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: em(4)
  },
  titleText: {
    textAlign: 'center'
  }
})

class Calendar extends Component {
  constructor (props) {
    super(props)

    const start = moment().startOf('day')

    this.state = {
      active: 0,
      currentStamp: start.clone().add(-1, 'days').hour(24).minute(0).second(0).toISOString()
    }

    this._changeDate = this._changeDate.bind(this)
    this._saveAppointment = this._saveAppointment.bind(this)
  }

  _getSlots = (stamp) => {
    const {
      byDay,
      byId
    } = this.props.appointments

    let output = []

    if (byDay[stamp]) {
      const idList = byDay[stamp]

      idList.forEach(slot => {
        output.push(byId[slot])
      })
    }

    return output
  }

  _changeDate (index, time, stamp) {
    this.setState({
      active: index,
      currentStamp: stamp
    })
  }

  _generateDays () {
    const start = moment().startOf('day')

    const calendarConfig = {
      sameDay: '[Today], dddd',
      lastDay: '[Yesterday], dddd',
      lastWeek: '[Last], dddd',
      nextDay: '[Tomorrow], dddd',
      nextWeek: 'dddd'
    }

    let days = []

    let dayIndex = 0

    while (dayIndex < 7) {
      const stamp = start.clone().add(dayIndex - 1, 'days').hour(24).minute(0).second(0).toISOString()

      const day = {
        date: start.clone().add(dayIndex, 'days').format('Do MMM'),
        unix: start.clone().add(dayIndex, 'days').toISOString(),
        raw: start.clone().add(dayIndex, 'days'),
        stamp: stamp,
        title: start.clone().add(dayIndex, 'days').calendar(null, calendarConfig)
      }

      days.push(day)

      dayIndex++
    }

    return days
  }

  componentDidMount () {
    const start = moment(this.state.currentStamp).toISOString()
    const end = moment(this.state.currentStamp).add(6, 'days').toISOString()

    this.props.getAppointments(start, end)
  }

  _saveAppointment (appointment) {
    this.props.action(appointment)
  }

  render () {
    const days = this._generateDays()
    const slots = this._getSlots(this.state.currentStamp)

    return (
      <View style={[calendarStyles.layout]}>
        <DayBar
          items={days}
          active={this.state.active}
          action={this._changeDate}
        />
        <View style={[calendarStyles.title]}>
          <TextBox localStyle={[calendarStyles.titleText]}>These are the slots available for your interview</TextBox>
        </View>
        <Slots slots={slots} action={this._saveAppointment} />
      </View>
    )
  }
}

const dayBarStyles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    height: em(4.75)
  }
})

class DayBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      index: 0
    }

    this.changeDay = this.changeDay.bind(this)
  }

  changeDay (index, time, stamp) {
    this.setState({
      index: index
    })

    console.log('Raw stamp', stamp)

    this.props.action(index, time, stamp)
  }

  render () {
    const start = moment().startOf('day')

    const calendarConfig = {
      sameDay: '[Today], dddd',
      lastDay: '[Yesterday], dddd',
      lastWeek: '[Last], dddd',
      nextDay: '[Tomorrow], dddd'
    }

    let days = []

    let dayIndex = 0

    while (dayIndex < 7) {
      const day = {
        date: start.clone().add(dayIndex, 'days').format('Do MMM'),
        unix: start.clone().add(dayIndex, 'days').toISOString(),
        title: start.clone().add(dayIndex, 'days').calendar(null, calendarConfig)
      }

      days.push(day)

      dayIndex++
    }

    const active = this.props.active

    const children = this.props.items.map((day, index) => {
      return (
        <DayButton
          {...day}
          key={index}
          active={active === index}
          index={index}
          action={this.changeDay.bind(null, index, day.raw, day.stamp)}
        />
      )
    })

    return (
      <View style={dayBarStyles.layout}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    )
  }
}

const dayButtonStyles = StyleSheet.create({
  layout: {
    flex: 0,
    width: vw(75)
  },
  inner: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: em(1),
    paddingLeft: em(1)
  },
  active: {
    backgroundColor: colors.complete
  },
  inactive: {
    backgroundColor: colors.active
  },
  icon: {
    width: 17,
    height: 18,
    marginRight: em(0.5)
  },
  textSmall: {
    fontSize: em(0.9)
  },
  textLarge: {
    fontSize: em(1.2)
  },
  textBase: {
    color: colors.text_alternate
  },
  textInactive: {
    color: colors.ui_1
  }
})

const DayButton = (props) => {
  const layoutMode = props.active ? dayButtonStyles.active : dayButtonStyles.inactive
  const textMode = props.active ? null : dayButtonStyles.textInactive

  return (
    <View style={[dayButtonStyles.layout, layoutMode]}>
      <Button
        innerStyle={[dayButtonStyles.inner]}
        action={props.action}
        >
        <IconNormal />
        <View>
          <TextBox localStyle={[dayButtonStyles.textBase, dayButtonStyles.textLarge, textMode]}>{props.date}</TextBox>
          <TextBox localStyle={[dayButtonStyles.textBase, dayButtonStyles.textSmall, textMode]}>{props.title}</TextBox>
        </View>
      </Button>
    </View>
  )
}

const IconNormal = (props) => {
  return (
    <View style={dayButtonStyles.icon}>
      <ResponsiveImage icon={'iconCalendarGreen'} />
    </View>
  )
}

const slotStyles = StyleSheet.create({
  layout: {
    flex: 1,
    alignSelf: 'stretch'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  }
})

class Slots extends Component {
  constructor (props) {
    super(props)

    this.state = {
      slot: null
    }

    this.changeSlot = this.changeSlot.bind(this)
  }

  componentWillReceiveProps () {
    this.setState({
      slot: null
    })
  }

  changeSlot (slot) {
    const changed = slot === this.state.slot ? null : slot

    this.setState({
      slot: changed
    })

    const appointment = changed ? this.props.slots[slot] : null

    this.props.action(appointment)
  }

  render () {
    const active = this.state.slot

    const children = this.props.slots.map((slot, index) => {
      const start = moment(slot.startTime).format('HH:mm')
      const end = moment(slot.endTime).format('HH:mm')

      const action = slot.leadTimePassed ? null : this.changeSlot.bind(null, index)

      return (
        <Slot
          available={slot.leadTimePassed}
          active={active === index}
          key={index}
          start={start}
          end={end}
          action={action}
        />
      )
    })

    return (
      <View style={[slotStyles.layout]}>
        <ScrollView>
          <View style={[slotStyles.wrapper]}>
            {children}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const COLUMNS = 3
const MARGIN = em(0.75)
const SPACING = (COLUMNS + 1) / COLUMNS * MARGIN

const slotCellStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 1,
    width: vw(100) / COLUMNS - SPACING,
    height: em(3.25),
    paddingTop: em(0.5),
    paddingBottom: em(0.5),
    paddingLeft: em(1),
    paddingRight: 0,
    backgroundColor: colors.ui_1,
    marginLeft: MARGIN,
    marginTop: MARGIN,
    borderRadius: em(0.6)
  },
  ghosted: {
    opacity: 0.2
  },
  active: {
    backgroundColor: colors.complete
  },
  override: {
    alignSelf: 'flex-start'
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingLeft: 0
  },
  textBase: {
    lineHeight: em(1)
  },
  textActive: {
    color: colors.ui_1
  },
  icon: {
    width: 18,
    height: 14,
    marginLeft: em(1)
  }
})

const Slot = (props) => {
  const layoutMode = props.active ? slotCellStyles.active : (props.available ? slotCellStyles.ghosted : null)
  const textMode = props.active ? slotCellStyles.textActive : null

  return (
    <View style={[slotCellStyles.layout, layoutMode]}>
      <Button
        innerStyle={[slotCellStyles.inner]}
        action={props.action}
        >
        <View>
          <TextBox localStyle={[slotCellStyles.textBase, textMode]}>{props.start}</TextBox>
          <TextBox localStyle={[slotCellStyles.textBase, textMode]}>{props.end}</TextBox>
        </View>
        {props.active && <Selected />}
      </Button>
    </View>
  )
}

const Selected = () => {
  return (
    <View style={slotCellStyles.icon}>
      <ResponsiveImage icon={'iconComplete'} />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAppointments: (fromStamp, toStamp) => {
      return dispatch(getAppointments(fromStamp, toStamp))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

// export default Calendar
