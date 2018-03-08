import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em,
  colors
} from '../../styles'

import RoundBlob from '../../components/RoundBlob'
import TextBox from '../../components/TextBox'
import ModalButtonGreen from '../../components/ModalButtonGreen'
import ModalButtonWhite from '../../components/ModalButtonWhite'

import Destination from './Destination'
import Details from './Details'
import Amount from './Amount'

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  row: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  text: {
    color: colors.text_alternate,
    fontSize: em(0.65),
    flexGrow: 1,
    alignSelf: 'stretch',
    textAlign: 'left'
  },
  button: {
    flexGrow: 1
  },
  blob: {
    backgroundColor: 'rgb(255,255,255)',
    padding: em(0.75),
    marginBottom: em(1.3)
  }
})

const listed = StyleSheet.create({
  blob: {
    backgroundColor: 'rgb(255,255,255)'
  },
  text: {
    color: colors.text_alternate
  }
})

const overlapped = StyleSheet.create({
  blob: {
    backgroundColor: 'rgb(255,255,255)',
    opacity: 0.5
  },
  text: {
    color: colors.text_alternate
  }
})

const selected = StyleSheet.create({
  blob: {
    backgroundColor: colors.ui_1
  },
  text: {
    color: 'rgb(255,255,255)'
  }
})

// STATES
// Listed
// Overlapped
// Selected

class Shifts extends Component {
  _accept = () => {
    const shiftMap = this._createShiftMap(this.props.shifts)

    this.props.action(this.props.id, {
      id: this.props.id,
      location: this.props.location,
      shiftMap
    })
  }

  _createShiftMap = (shifts) => {
    let acumulatedPay = 0

    const output = shifts.map(shift => {
      const day = moment(shift.startTime).format('dddd')
      const date = moment(shift.startTime).format('DD/MM/YY')
      const hours = `${moment(shift.startTime).format('HH:mm')} - ${moment(shift.endTime).format('HH:mm')}`
      const rate = numeral(shift.hourlyRate / 100).format('0.00')

      const running = moment.duration(moment(shift.endTime).diff(moment(shift.startTime))).asHours()

      acumulatedPay += (shift.hourlyRate * running)

      return {
        id: shift.id,
        raw: shift.startTime,
        day,
        date,
        hours,
        rate
      }
    })

    return {
      output,
      acumulatedPay
    }
  }

  render () {
    const type = this.props.type

    const Button = type === 'selected' ? ModalButtonWhite : ModalButtonGreen

    const stateStyle = type === 'listed' ? listed : (type === 'overlapped' ? overlapped : selected)

    const buttonText = type === 'listed' ? 'Book shifts' : (type === 'overlapped' ? 'Overlapped' : 'Shifts booked')

    // let acumulatedPay = 0

    const shiftMap = this._createShiftMap(this.props.shifts)

    const shifts = shiftMap.output.map(shift => {
      return (
        <Details
          key={shift.id}
          type={type}
          border
          day={shift.day}
          date={shift.date}
          hours={shift.hours}
          rate={shift.rate}
        />
      )
    })

    const amount = numeral(shiftMap.acumulatedPay / 100).format('0.00')

    // const shifts = this.props.shifts.map(shift => {
    //   const day = moment(shift.startTime).format('dddd')
    //   const date = moment(shift.startTime).format('DD/MM/YY')
    //   const hours = `${moment(shift.startTime).format('HH:mm')} - ${moment(shift.endTime).format('HH:mm')}`
    //   const rate = numeral(shift.hourlyRate / 100).format('0.00')

    //   const running = moment.duration(moment(shift.endTime).diff(moment(shift.startTime))).asHours()

    //   acumulatedPay += (shift.hourlyRate * running)

    //   return (
    //     <Details
    //       key={shift.id}
    //       type={type}
    //       border
    //       day={day}
    //       date={date}
    //       hours={hours}
    //       rate={rate}
    //     />
    //   )
    // })

    // const amount = numeral(acumulatedPay / 100).format('0.00')

    return (
      <RoundBlob localStyle={[styles.blob, stateStyle.blob]}>
        <View style={styles.layout}>
          <View style={styles.row}>
            <Destination
              location={this.props.location}
              type={type}
            />
            <Amount
              type={type}
              amount={amount}
            />
          </View>
          {shifts}
          <View style={styles.row}>
            <TextBox localStyle={[styles.text, stateStyle.text]}>* pending NI contributions</TextBox>
          </View>
          <View style={styles.row}>
            <Button
              localStyle={styles.button}
              label={buttonText}
              action={this._accept}
            />
          </View>
        </View>
      </RoundBlob>
    )
  }
}

export default Shifts
