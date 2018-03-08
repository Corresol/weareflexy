import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

import {
  StyleSheet
} from 'react-native'

import {
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import TextBox from '../../components/TextBox'
import ModalButtonWhite from '../../components/ModalButtonWhite'
import JobOverview from '../../widgets/JobOverview'
import BookedShift from '../../widgets/BookedShift'

import ScrollContainer from '../../containers/ScrollContainer'

import {
  colors,
  em
} from '../../styles'

const styles = StyleSheet.create({
  info: {
    flexGrow: 0,
    paddingTop: em(1)
  },
  overview: {
    paddingBottom: 0
  },
  title: {
    marginBottom: em(0.5),
    textAlign: 'center'
  },
  text: {
    lineHeight: em(1.125)
  },
  spacedText: {
    marginBottom: em(1)
  },
  hr: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch',
    height: em(1),
    marginBottom: em(1),
    borderColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1
  },
  scrollOveride: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: em(1.5),
    paddingRight: em(1.5)
  },
  holder: {
    flexGrow: 0,
    height: em(6.75)
  },
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  },
  wrapper: {
    paddingLeft: em(1.5),
    paddingRight: em(1.5)
  }
})

class Booked extends Component {
  static viewMenuTitle = 'You’re booked!'
  static showHeader = true
  static headerType = 'titleNoLogo'

  _showFaq = () => {
    const {
      navigate
    } = this.props.navigation

    navigate('FAQ')
  }

  _finish = () => {
    this.props.drawer()
  }

  render () {
    const bookedShifts = this.props.shifts.map(shift => {
      const days = shift.shiftMap.output.map(day => {
        return moment(day.raw).format('ddd DD/MM')
      })

      const amount = numeral(shift.shiftMap.acumulatedPay / 100).format('0.00')

      const hours = shift.shiftMap.output[0].hours

      return (
        <BookedShift
          key={shift.id}
          location={shift.location}
          amount={amount}
          days={days}
          hours={hours}
        />
      )
    })

    return (
      <Vertical>
        <JobOverview
          mode={'white'}
        />
        <ScrollContainer localStyle={styles.scrollOveride}>
          {bookedShifts}
          <TextBox localStyle={[styles.text, styles.spacedText]}>You will be reminded before each of your shifts. You can access your shifts in your shifts timeline from your menu and landing page.
          </TextBox>
        </ScrollContainer>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonWhite
            localStyle={styles.button}
            label={'Ok. Thank you'}
            action={this._finish}
          />
        </CellCentered>
      </Vertical>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId],
    shifts: state.appCache.shifts
  }
}

export default connect(mapStateToProps)(Booked)

// export default Booked
