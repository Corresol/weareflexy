import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  StyleSheet,
  View
} from 'react-native'

import ModalButtonGreen from '../../components/ModalButtonGreen'
import { ResponsiveImage } from '../../components/Icons'
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
  text,
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
  },
  fauxTitleHolder: {
    flexGrow: 0,
    flexShrink: 0,
    height: em(3.75),
    paddingTop: em(1),
    paddingLeft: em(2.5)
  }
})

class InfoComplete extends Component {
  static showHeader = true
  static headerType = 'noTitle'
  static background = true

  _openDrawer = () => {
    this.props.drawer()
  }

  render () {
    const {
      firstName
    } = this.props.account

    const name = `Hi ${firstName}!`

    return (
      <Vertical>
        <CellStart localStyle={styles.fauxTitleHolder}>
          <TextBox localStyle={text.title}>{name}</TextBox>
        </CellStart>
        <CellCentered localStyle={styles.paddingReset}>
          <JobDemo />
        </CellCentered>
        <CellStart>
          <TextBox localStyle={styles.big}>So you can start applying for the jobs you’re interested in, we need to have a short video call with you.</TextBox>
          <ModalButtonGreen
            label={'Book appointment'}
            action={this._openDrawer}
          >
            <View>
              <ResponsiveImage icon={'iconCalendarWhite'} />
            </View>
          </ModalButtonGreen>
        </CellStart>
      </Vertical>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.workerAccount
  }
}

export default connect(mapStateToProps)(InfoComplete)
