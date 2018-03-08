import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import {
  CellStart,
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import TextBox from '../../components/TextBox'
import ModalButtonWhite from '../../components/ModalButtonWhite'
import ProfileLevel from '../../components/ProfileLevel'
import FAQButton from '../../components/FAQButton'

import {
  colors,
  em,
  text
} from '../../styles'

const styles = StyleSheet.create({
  info: {
    flexGrow: 0,
    paddingTop: em(1)
  },
  text: {
    textAlign: 'center'
  },
  title: {
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
  profileLevel: {
    marginTop: em(2),
    marginBottom: em(1)
  }
})

class Notification extends Component {
  static viewMenuTitle = 'Complete your profile'
  static showHeader = true
  static headerType = 'noTitle'

  _finish = () => {
    const {
      navigate
    } = this.props.navigation

    navigate('GONEXT')
  }

  _showFaq = () => {
    console.log('Tapped show FAQ')
    const {
      navigate
    } = this.props.navigation

    navigate('FAQ')
  }

  render () {
    const {
      firstName,
      profileCompletionPct,
      profileCompletionLevel
    } = this.props.account

    return (
      <Vertical>
        <CellStart>
          <TextBox localStyle={[text.title, styles.title]}>Congratulations {firstName}!</TextBox>
          <TextBox localStyle={[text.subtitle, styles.title]}>You are now part of the Flexy team!</TextBox>
          <TextBox>You will be getting notified about jobs you might be interested in. You can also browse for jobs and express interest.</TextBox>
          <View style={styles.hr} />
          <FAQButton action={this._showFaq} />
          <ProfileLevel
            localStyle={styles.profileLevel}
            percentage={profileCompletionPct}
            title={profileCompletionLevel}
          />
          <TextBox>Your profile status can improve significantly. But don’t worry, it is very easy to increase your chances of being considered for our top jobs. Press continue and we’ll guide you all the way.</TextBox>
        </CellStart>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonWhite
            localStyle={styles.button}
            label={'Continue'}
            action={this._finish}
          />
        </CellCentered>
      </Vertical>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.workerAccount
  }
}

export default connect(mapStateToProps)(Notification)
