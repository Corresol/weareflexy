import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'

import ModalButtonGreen from '../../components/ModalButtonGreen'
import Link from '../../components/Link'

import JobDemo from '../../widgets/JobDemo'

import {
  CellStart,
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import TextBox from '../../components/TextBox'

import {
  em
} from '../../styles'

const styles = StyleSheet.create({
  big: {
    fontSize: em(1.125),
    marginTop: em(2),
    marginBottom: em(2)
  },
  normal: {
    marginBottom: em(1)
  },
  paddingReset: {
    paddingLeft: em(1.125),
    paddingRight: em(1.125)
  }
})

export default class Default extends Component {
  static viewMenuTitle = 'Welcome to Flexy!'
  static showHeader = true
  static background = true

  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  _goLogin = () => {
    const {
      navigate
    } = this.props.navigation

    navigate('Login')
  }

  _openDrawer = () => {
    this.props.drawer()
  }

  render () {
    return (
      <Vertical>
        <CellCentered localStyle={styles.paddingReset}>
          <JobDemo />
        </CellCentered>
        <CellStart>
          <TextBox localStyle={styles.big}>So we can offer you better jobs, please complete your registration.</TextBox>
          <Link
            label={'Do you have an account? Login'}
            action={this._goLogin}
            />
          <ModalButtonGreen
            label={'Create a new Flexy account'}
            action={this._openDrawer}
          />
        </CellStart>
      </Vertical>
    )
  }
}
