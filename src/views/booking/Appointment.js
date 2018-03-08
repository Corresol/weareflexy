import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet
} from 'react-native'

import {
  CellCentered,
  CellStart
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import TextBox from '../../components/TextBox'
import ModalButtonWhite from '../../components/ModalButtonWhite'
import Slider from '../../components/Slider'
import RoundBlob from '../../components/RoundBlob'
import { ResponsiveImage } from '../../components/Icons'

import {
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
    textAlign: 'center'
  },
  noPadding: {
    flexGrow: 1,
    flexShrink: 1,
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
    paddingBottom: em(0.5)
  },
  limited: {
    flexGrow: 0
  }
})

export default class Confirmation extends Component {
  static viewMenuTitle = 'Book an appointment'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      canGoTo: 0,
      ghosted: true
    }
  }

  _slideEnded (index) {
    const ghosted = index === 1

    this.setState({
      canGoTo: index,
      ghosted: !ghosted
    })
  }

  render () {
    const {
      navigate
    } = this.props.navigation

    const ButtonIcon = this.state.ghosted ? IconGhosted : IconNormal

    return (
      <Vertical>
        <CellCentered localStyle={styles.content}>
          <RoundBlob>
            <Slider
              free
              index={this.state.canGoTo}
              ended={(index) => this._slideEnded(index)}
              >
              <View style={styles.noPadding}>
                <CellStart localStyle={[styles.noPadding, styles.padded]}>
                  <TextBox localStyle={[text.subtitle, styles.text]}>So that you can start applying for jobs and booking shifts, we need to check you are eligibile to work in the UK.</TextBox>
                  <TextBox localStyle={[text.subtitle, styles.text]}>Please book a quick video call with one of our checkers. It will only take a few minutes</TextBox>
                </CellStart>
                <CellCentered localStyle={styles.noPadding}>
                  <Image
                    source={require('../../../assets/png/icon_webcam_meeting/icon.png')}
                    style={{
                      width: 104,
                      height: 103
                    }}
                  />
                </CellCentered>
              </View>
              <View style={styles.noPadding}>
                <CellStart localStyle={[styles.noPadding, styles.padded, styles.limited]}>
                  <TextBox localStyle={[text.subtitle, styles.text]}>Please note you will need:</TextBox>
                </CellStart>
                <CellCentered localStyle={styles.noPadding}>
                  <Image
                    source={require('../../../assets/png/icon_passport_small/icon.png')}
                    style={{
                      width: 104,
                      height: 77
                    }}
                  />
                  <TextBox localStyle={[styles.centered]}>EU Passport</TextBox>
                  <TextBox localStyle={[text.normal, styles.centered]}>(or valid UK work VISA)</TextBox>
                </CellCentered>
                <CellCentered localStyle={styles.noPadding}>
                  <Image
                    source={require('../../../assets/png/icon_national_insurance/icon.png')}
                    style={{
                      width: 104,
                      height: 77
                    }}
                  />
                  <TextBox localStyle={[styles.centered]}>National Insurance Number</TextBox>
                  <TextBox localStyle={[text.normal, styles.centered]}>(if you have one)</TextBox>
                </CellCentered>
              </View>
            </Slider>
          </RoundBlob>
        </CellCentered>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonWhite
            ghosted={this.state.ghosted}
            label={'Book Appointment'}
            action={() => navigate('TimeSlot')}
          >
            <ButtonIcon />
          </ModalButtonWhite>
        </CellCentered>
      </Vertical>
    )
  }
}

const IconNormal = (props) => {
  return (
    <View style={styles.icon}>
      <ResponsiveImage icon={'iconCalendarGreen'} />
    </View>
  )
}

const IconGhosted = (props) => {
  return (
    <View style={styles.icon}>
      <ResponsiveImage icon={'iconCalendarWhite'} />
    </View>
  )
}
