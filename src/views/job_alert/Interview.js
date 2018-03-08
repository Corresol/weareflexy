import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import {
  CellStart,
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import TextBox from '../../components/TextBox'
import ModalButtonWhite from '../../components/ModalButtonWhite'
import FAQButton from '../../components/FAQButton'
import JobOverview from '../../widgets/JobOverview'
import { ResponsiveImage } from '../../components/Icons'

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

class Interview extends Component {
  static viewMenuTitle = 'Yes. I’m interested!'
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
    return (
      <Vertical>
        <JobOverview
          mode={'white'}
          employerRating={4}
          employerName={'Hobbs London'}
          title={'Marketing Campaigns - Contacting our database members'}
          localStyle={styles.overview}
        />
        <CellStart>
          <View style={styles.hr} />
          <FAQButton action={this._showFaq} />
          <View>
            <Icon />
          </View>
          <TextBox localStyle={[text.title, styles.title]}>An interview is required!</TextBox>
          <TextBox localStyle={[styles.text, styles.spacedText]}>The employer will get in touch with you in due time for a casual interview. This is to ascertain if you will be a good match for the job.
          </TextBox>
          <TextBox localStyle={[styles.text, styles.spacedText]}>Once accepted, you will receive a message and all necessary instructions for steps ahead.</TextBox>
          <TextBox localStyle={[styles.text]}>Best of luck!</TextBox>
          <TextBox localStyle={[styles.text]}>The Flexy Team</TextBox>
        </CellStart>
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

const iconStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: em(1),
    paddingBottom: em(1)
  },
  iconContainer: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(4.5),
    height: em(4.5),
    borderRadius: em(2.25),
    backgroundColor: colors.ui_2
  },
  badgeContainer: {
    position: 'absolute',
    top: em(0.5),
    right: em(-0.5),
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(2.2),
    height: em(2.2),
    borderRadius: em(1.1),
    backgroundColor: 'rgb(255,255,255)'
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: 32,
    height: 32
  },
  badge: {
    flexGrow: 0,
    flexShrink: 0,
    width: 16,
    height: 18
  }
})

const Icon = (props) => {
  return (
    <View style={iconStyles.layout}>
      <View style={iconStyles.iconContainer}>
        <View style={iconStyles.icon}>
          <ResponsiveImage icon={'iconChat'} />
        </View>
      </View>
      <View style={iconStyles.badgeContainer}>
        <View style={iconStyles.badge}>
          <ResponsiveImage icon={'iconCalendarGreen'} />
        </View>
      </View>
    </View>
  )
}

export default Interview
