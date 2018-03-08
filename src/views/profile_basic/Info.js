import React, { Component } from 'react'
import {
  View,
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
import ModalButtonOrange from '../../components/ModalButtonOrange'
import Slider from '../../components/Slider'
import RoundBlob from '../../components/RoundBlob'
import { ResponsiveImage } from '../../components/Icons'

import {
  em,
  text,
  colors
} from '../../styles'

const styles = StyleSheet.create({
  holder: {
    flexGrow: 0,
    height: em(6.75)
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: em(0.5)
  },
  text: {
    alignSelf: 'stretch',
    marginBottom: em(0.5)
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
    paddingTop: 0,
    paddingBottom: em(0.5)
  },
  limited: {
    flexGrow: 0
  },
  profileIcon: {
    height: em(6.75),
    alignSelf: 'stretch'
  },
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  }
})

const largeProfile = require('../../../assets/png/icon_profile_large/icon.png')
const largeDemo = require('../../../assets/png/image_profile_demo_50/image.png')

export default class Info extends Component {
  static viewMenuTitle = 'Complete your profile'
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

    const level = 'Basic'

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
                  <TextBox localStyle={[text.subtitle, styles.text]}>Welcome to your profile screen!</TextBox>
                  <TextBox localStyle={[text.subtitle, styles.text]}>During our recent call, we’ve already got some information about you. However, the more complete your profile is, the higher the chances to get more and better jobs will be.</TextBox>
                </CellStart>
                <CellCentered localStyle={styles.noPadding}>
                  <View style={styles.profileIcon}>
                    <ResponsiveImage icon={largeProfile} />
                  </View>
                </CellCentered>
              </View>
              <View style={styles.noPadding}>
                <CellStart localStyle={[styles.noPadding, styles.padded, styles.limited]}>
                  <TextBox localStyle={[text.bold]}>Your current profile status is:</TextBox>
                  <TextBox localStyle={[text.subtitle, styles.text]}>{level}</TextBox>
                  <TextBox localStyle={[text.subtitle, styles.text]}>Improving your profile is very easy. You just need to quickly provide information about your education, experience, skills and availability. We’ll guide you all the way!</TextBox>
                </CellStart>
                <CellCentered localStyle={styles.noPadding}>
                  <View style={styles.profileIcon}>
                    <ResponsiveImage icon={largeDemo} />
                  </View>
                </CellCentered>
              </View>
            </Slider>
          </RoundBlob>
        </CellCentered>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonOrange
            localStyle={styles.button}
            ghosted={this.state.ghosted}
            label={'Complete my profile'}
            action={() => navigate('Upload')}
          >
            <Icon />
          </ModalButtonOrange>
        </CellCentered>
      </Vertical>
    )
  }
}

const Icon = (props) => {
  return (
    <View style={styles.icon}>
      <ResponsiveImage icon={'iconProfilePrompt'} />
    </View>
  )
}
