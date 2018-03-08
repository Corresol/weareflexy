import React, { Component } from 'react'
import {
  Image,
  StyleSheet
} from 'react-native'

import {
  CellSpread,
  CellCentered,
  CellStart
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import RoundBlob from '../../components/RoundBlob'
import TextBox from '../../components/TextBox'
import ModalButtonOrange from '../../components/ModalButtonOrange'

import {
  colors,
  em,
  text
} from '../../styles'

const styles = StyleSheet.create({
  holder: {
    flexGrow: 0,
    height: em(6.75)
  },
  icon: {
    width: 17,
    height: 18,
    marginRight: em(0.5)
  },
  text: {
    alignSelf: 'stretch',
    marginBottom: em(1)
  },
  centered: {
    marginTop: em(0.75),
    textAlign: 'center'
  },
  noPadding: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 0,
    paddingRight: 0
  },
  content: {
    paddingLeft: em(1.125),
    paddingRight: em(1.125)
  },
  padded: {
    paddingTop: em(1),
    paddingBottom: em(2)
  },
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  }
})

export default class Confirmation extends Component {
  static viewMenuTitle = 'Why we need your passport'
  static showHeader = true

  render () {
    const {
      navigate
    } = this.props.navigation

    return (
      <Vertical>
        <CellSpread localStyle={styles.content}>
          <RoundBlob>
            <CellStart localStyle={[styles.noPadding, styles.padded]}>
              <TextBox localStyle={[text.subtitle, styles.text]}>By uploading your valid EU passport, you are automatically proving your right to work in the UK.</TextBox>
              <TextBox localStyle={[text.subtitle, styles.text]}>The Flexy staff checker you book the appointment with will check your passport before the interview.</TextBox>
              <TextBox localStyle={[text.subtitle, styles.text]}>This will speed up the process.</TextBox>
            </CellStart>
            <CellCentered localStyle={styles.noPadding}>
              <Image
                source={require('../../../assets/png/icon_passport_small_locked/icon.png')}
                style={{
                  width: 124,
                  height: 79
                }}
              />
              <TextBox localStyle={[styles.centered]}>All your personal data is stored securely in accordance with data protection legislation.</TextBox>
            </CellCentered>
          </RoundBlob>
        </CellSpread>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonOrange
            localStyle={styles.button}
            label={'Upload Passport'}
            action={() => navigate('Upload')}
          >
            <Image
              source={require('../../../assets/png/icon_calendar_white/icon.png')}
              style={styles.icon}
            />
          </ModalButtonOrange>
        </CellCentered>
      </Vertical>
    )
  }
}
