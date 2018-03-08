import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  storeShifts,
  checkScheduleConflict,
  sendSchedules
} from '../../actions'

import {
  View,
  StyleSheet
} from 'react-native'

import ModalButtonGrey from '../../components/ModalButtonGrey'
import ModalButtonOrange from '../../components/ModalButtonOrange'
import TextBox from '../../components/TextBox'
import FAQButton from '../../components/FAQButton'

import JobOverview from '../../widgets/JobOverview'
import Shifts from '../../widgets/Shifts'

import {
  Vertical
} from '../../containers/Grid'

import {
  CellCentered
} from '../../containers/Cell'

import ScrollContainer from '../../containers/ScrollContainer'

import {
  text,
  em,
  colors
} from '../../styles'

import deepSort from '../../utils/deepSort'

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'rgb(246,246,246)'
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    paddingLeft: 0,
    paddingRight: 0
  },
  header: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgb(255,255,255)'
  },
  description: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: em(2.25),
    paddingRight: em(2.25)
  },
  descriptionInner: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: em(1),
    paddingBottom: em(1),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.text_alternate
  },
  descriptionText: {
    color: colors.text_alternate,
    lineHeight: em(1.125)
  },
  faqHolder: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: em(1),
    paddingLeft: em(2.25),
    paddingRight: em(1),
    paddingBottom: em(1)
  },
  shiftContainer: {
    alignSelf: 'stretch',
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(1.25),
    paddingRight: em(1.25)
  },
  scrollOveride: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  holder: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexGrow: 0,
    height: em(6.75),
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(220,220,220)'
  },
  button: {
    flexGrow: 1,
    alignSelf: 'center',
    margin: em(0.25)
  }
})

const sortToBlocks = (collection, key) => {
  let map = {}

  collection.forEach(item => {
    const id = item[key]

    if (map[id]) {
      map[id].push(item)
    } else {
      map[id] = [item]
    }
  })

  return map
}

const getSchedules = (collection) => {
  let locations = sortToBlocks(collection, 'locationId')

  for (let location in locations) {
    let schedules = sortToBlocks(locations[location], 'scheduleId')

    for (let schedule in schedules) {
      schedules[schedule] = deepSort(schedules[schedule], 'startTime')
    }

    locations[location] = schedules
  }

  return locations
}

class Schedule extends Component {
  static viewMenuTitle = 'New shifts available!'
  static showHeader = true
  static headerType = 'titleNoLogo'

  constructor (props) {
    super(props)

    this.state = {
      ghosted: true,
      slots: []
    }
  }

  _decline = () => {
    const {
      goBack
    } = this.props.navigation

    goBack()
  }

  _accept = () => {
    const {
      navigate
    } = this.props.navigation

    this.props.storeShifts(this.state.slots)

    let slots = [
      ...this.state.slots
    ]

    const scheduleIds = slots.map(slot => {
      return slot.id
    })

    this.props.sendSchedules(this.props.job.id, scheduleIds, this.props.job.version)
      .then(response => {
        console.log('Booked response', response)
        navigate('Booked')
      })

    navigate('Booked')
  }

  _finish = () => {
    this.props.drawer()
  }

  _showFAQ = () => {
    const {
      navigate
    } = this.props.navigation

    navigate('FAQ')
  }

  _chooseBooking = (index, shifts) => {
    // console.log('Booking chosen', shifts)

    let slots = [
      ...this.state.slots
    ]

    const isIn = slots.findIndex(slot => { return slot.id === index })

    if (isIn !== -1) {
      slots.splice(isIn, 1)
    } else {
      slots.push(shifts)
    }

    const check = slots.map(slot => {
      return slot.id
    })

    this.props.checkScheduleConflict(check)
      .then(response => {
        console.log('Conflict check', response)
      })

    const ghosted = slots.length > 0

    this.setState({
      slots: slots,
      ghosted: !ghosted
    })
  }

  _getSchedules = () => {
    let ScheduleList = []

    const locations = getSchedules(this.props.job.shifts)

    for (var location in locations) {
      const locationName = this.props.job.locations[location].address

      const schedules = locations[location]

      for (var schedule in schedules) {
        const shifts = schedules[schedule]

        const type = this.state.slots.find(slot => { return slot.id === schedule }) ? 'selected' : 'listed'

        ScheduleList.push((
          <Shifts
            type={type}
            id={schedule}
            key={schedule}
            location={locationName}
            shifts={shifts}
            action={this._chooseBooking}
          />
        ))
      }
    }

    return ScheduleList
  }

  render () {
    return (
      <Vertical localStyle={styles.layout}>
        <View style={[styles.container]}>
          <ScrollContainer localStyle={styles.scrollOveride}>
            <View style={[styles.header]}>
              <JobOverview
                mode={'color'}
              />
              <View style={styles.description}>
                <View style={styles.descriptionInner}>
                  <TextBox localStyle={[text.normal, styles.descriptionText]}>These are the shifts currently available for this job. You can book as many as you like, as long as they don’t overlap. By booking them you commit to attending to all shifts included.</TextBox>
                </View>
              </View>
              <View style={styles.faqHolder}>
                <FAQButton
                  mode={'color'}
                  action={this._showFAQ}
                />
              </View>
            </View>
            <View style={styles.shiftContainer}>
              {this._getSchedules()}
            </View>
          </ScrollContainer>
        </View>
        <CellCentered localStyle={[styles.holder]}>
          <ModalButtonGrey
            localStyle={styles.button}
            label={'Cancel'}
            action={this._decline}
          />
          <ModalButtonOrange
            ghosted={this.state.ghosted}
            localStyle={styles.button}
            label={'Ok. I’m done'}
            action={this._accept}
          />
        </CellCentered>
      </Vertical>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeShifts: (shifts) => {
      return dispatch(storeShifts(shifts))
    },
    checkScheduleConflict: (schedules) => {
      return dispatch(checkScheduleConflict(schedules))
    },
    sendSchedules: (jobId, scheduleIds, jobVersion) => {
      return dispatch(sendSchedules(jobId, scheduleIds, jobVersion))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)

// export default Schedule

// [ { id: 'f74b4eea-c83c-4592-a5c1-de5540b78f8a',
// shiftMap:
//  { output:
//     [ { id: '620ce9ea-7b8a-11e7-b0e3-036ca71590dd',
//         day: 'Monday',
//         date: '18/09/17',
//         hours: '09:30 - 17:30',
//         rate: '9.40' },
//       { id: '620ce9eb-7b8a-11e7-b0e3-b769f7ab6028',
//         day: 'Tuesday',
//         date: '19/09/17',
//         hours: '09:30 - 17:30',
//         rate: '9.40' },
//       { id: '620ce9ec-7b8a-11e7-b0e3-170c413d04f3',
//         day: 'Wednesday',
//         date: '20/09/17',
//         hours: '09:30 - 17:30',
//         rate: '9.40' },
//       { id: '620ce9ed-7b8a-11e7-b0e3-2741262d2ba4',
//         day: 'Thursday',
//         date: '21/09/17',
//         hours: '09:30 - 17:30',
//         rate: '9.40' },
//       { id: '620ce9ee-7b8a-11e7-b0e3-735c1e56771c',
//         day: 'Friday',
//         date: '22/09/17',
//         hours: '09:30 - 17:30',
//         rate: '9.40' } ],
//    acumulatedPay: 37600 } } ]
