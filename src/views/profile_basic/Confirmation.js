import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'

import {
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import TextBox from '../../components/TextBox'
import ModalButtonWhite from '../../components/ModalButtonWhite'
import ProfileImage from '../../components/ProfileImage'
import { ResponsiveImage } from '../../components/Icons'
import ProfileLevel from '../../components/ProfileLevel'

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
    marginTop: em(1)
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
    marginTop: em(1),
    marginBottom: em(1)
  }
})

class Confirmation extends Component {
  static viewMenuTitle = 'Profile updated. Thank you!'
  static showHeader = true

  _finish = () => {
    console.log('Finished')

    this.props.drawer('Testing to see if I can get a callback through')
  }

  render () {
    const {
      firstName,
      lastName,
      personalStatement,
      profileCompletionPct,
      profileCompletionLevel
    } = this.props.account

    const name = `${firstName} ${lastName}`

    return (
      <Vertical>
        <CellCentered localStyle={styles.info}>
          <ProfileImage
            size={4.5}
          />
          <TextBox localStyle={[text.subtitle, styles.text, styles.title]}>{name}</TextBox>
          <TextBox localStyle={[styles.text]} numberOfLines={2}>{personalStatement}</TextBox>
        </CellCentered>
        <CellCentered>
          <ProfileLevel
            localStyle={styles.profileLevel}
            percentage={profileCompletionPct}
            title={profileCompletionLevel}
          />
          <TextBox>As you can see, your profile status has already improved significantly. We now recommend you to keep improving your profile so you can get more and better jobs. Thank you!</TextBox>
        </CellCentered>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonWhite
            localStyle={styles.button}
            label={'See my profile'}
            action={this._finish}
          >
            <Icon />
          </ModalButtonWhite>
        </CellCentered>
      </Vertical>
    )
  }
}

const Icon = (props) => {
  return (
    <View style={styles.icon}>
      <ResponsiveImage icon={'iconProfileSmallGreen'} />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    account: state.workerAccount
  }
}

export default connect(mapStateToProps)(Confirmation)
