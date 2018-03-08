import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native'

import {
  colors,
  text,
  em
} from '../styles'

import RoundBlob from '../components/RoundBlob'
import TextBox from '../components/TextBox'
import ProfileLevel from '../components/ProfileLevel'

import {
  ResponsiveImage
} from '../components/Icons'

const styles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: colors.ui_1
  },
  wrapper: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  info: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  infoLevel: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: em(1)
  },
  title: {
    marginBottom: em(0.5)
  },
  body: {
    lineHeight: em(1.125)
  },
  icon: {
    width: em(3),
    height: em(3.5),
    marginRight: em(1),
    alignSelf: 'flex-start'
  },
  next: {
    width: em(0.625),
    height: em(1.5),
    alignSelf: 'flex-start'
  },
  profile: {
    marginTop: em(1.5)
  }
})

// low
// intermediate
// advanced

class CompleteProfile extends Component {
  render () {
    const {
      // photo,
      // pendingPhoto,
      // personalStatement,
      // psychResults,
      profileCompletionPct,
      profileCompletionLevel
    } = this.props.worker

    let Inner = Start

    if (profileCompletionPct > 0) Inner = Level

    return (
      <RoundBlob localStyle={styles.layout}>
        <Inner
          percentage={profileCompletionPct}
          title={profileCompletionLevel}
          action={this.props.action}
          />
      </RoundBlob>
    )
  }
}

const Start = (props) => {
  return (
    <TouchableHighlight
      onPress={props.action}
      underlayColor={'rgba(0,0,0,0)'}
      >
      <View style={styles.wrapper}>
        <SmallIcon />
        <View style={styles.info}>
          <TextBox localStyle={[text.subtitle, styles.title]}>Complete your profile</TextBox>
          <TextBox localStyle={[styles.body]}>The more information your profile provides, the higher the chances are to get more and better jobs.</TextBox>
        </View>
        <Next />
      </View>
    </TouchableHighlight>
  )
}

const Level = (props) => {
  return (
    <TouchableHighlight
      onPress={props.action}
      underlayColor={'rgba(0,0,0,0)'}
      >
      <View style={styles.wrapper}>
        <View style={styles.infoLevel}>
          <TextBox localStyle={[text.subtitle, styles.title]}>Complete your profile</TextBox>
          <TextBox localStyle={[styles.body]}>The more information your profile provides, the higher the chances are to get more and better jobs.</TextBox>
          <ProfileLevel
            localStyle={styles.profile}
            percentage={props.percentage}
            title={props.title}
          />
        </View>
        <Next />
      </View>
    </TouchableHighlight>
  )
}

const Next = (props) => {
  return (
    <View style={styles.next}>
      <ResponsiveImage icon={'iconForwardWhite'} />
    </View>
  )
}

const SmallIcon = (props) => {
  return (
    <View style={styles.icon}>
      <ResponsiveImage icon={'iconProfileSmall'} />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    worker: state.workerAccount
  }
}

export default connect(mapStateToProps)(CompleteProfile)
