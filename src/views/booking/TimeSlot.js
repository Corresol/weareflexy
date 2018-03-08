import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import {
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import ModalButtonOrange from '../../components/ModalButtonOrange'
import Calendar from '../../components/Calendar'

import {
  colors,
  em
} from '../../styles'

import {
  setAppointment
} from '../../actions'

const styles = StyleSheet.create({
  holder: {
    flexGrow: 0,
    height: em(6.75)
  },
  noPadding: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 0,
    paddingRight: 0
  },
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  }
})

class TimeSlot extends Component {
  static viewMenuTitle = 'Choose an available slot'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      ghosted: true,
      appointment: null
    }

    this.setAppointment = this.setAppointment.bind(this)
    this._save = this._save.bind(this)
  }

  componentDidMount () {
    console.log('TimeSlot mounting')
  }

  setAppointment (data) {
    console.log('Appointment set', data)

    if (data) {
      this.setState({
        ghosted: false,
        appointment: data
      })
    } else {
      this.setState({
        ghosted: true,
        appointment: null
      })
    }
  }



  _save () {
    const {
      navigate
    } = this.props.navigation

    this.props.saveAppointment(this.state.appointment)
      .then(result => {
        navigate('ChooseID')
      })
  }

  render () {
    console.log('Render?', this.props.transitionEnded)
    return (
      <Vertical>
        <CellCentered localStyle={[styles.noPadding]}>
          {this.props.transitionEnded && <Calendar action={this.setAppointment} />}
        </CellCentered>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonOrange
            localStyle={styles.button}
            ghosted={this.state.ghosted}
            label={'Next'}
            action={this._save}
          />
        </CellCentered>
      </Vertical>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAppointment: (data) => {
      return dispatch(setAppointment(data))
    }
  }
}

export default connect(null, mapDispatchToProps)(TimeSlot)
