import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  Horizontal,
  Vertical
} from '../containers/Grid'

import { ResponsiveImage } from '../components/Icons'
import TextBox from '../components/TextBox'
import Ratings from '../components/Rating'

import {
  em,
  text,
  colors
} from '../styles'

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0
  },
  wrapper: {
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: em(2),
    paddingRight: em(2)
  },
  name: {
    textAlign: 'center',
    marginTop: em(0.5),
    marginBottom: em(0.5)
  },
  title: {
    textAlign: 'center'
  },
  statement: {
    textAlign: 'center'
  },
  group: {
    flexGrow: 0,
    flexShrink: 0
  }
})

class ProfileBlock extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lines: 2
    }
  }

  onLayout = (event) => {
    console.log('Updating statement', event.nativeEvent.layout)

    const height = event.nativeEvent.layout.height - 16

    const lines = Math.abs(Math.floor(height / 23))

    if (lines !== this.state.lines) {
      this.setState({
        lines: lines
      })
    }
  }

  render () {
    const {
      firstName,
      lastName,
      phone,
      email,
      personalStatement
    } = this.props.account

    const name = `${firstName} ${lastName}`

    return (
      <Vertical localStyle={styles.layout}>
        <View style={styles.group}>
          <TextBox localStyle={[styles.name, text.title]}>{name}</TextBox>
          <Rating rating={1} rates={200} />
        </View>
        <View style={styles.wrapper} onLayout={this.onLayout}>
          <TextBox localStyle={[styles.statement]} numberOfLines={this.state.lines}>{personalStatement}</TextBox>
        </View>
        <View style={styles.group}>
          <Tabs />
          <Contact phone={phone} email={email} />
        </View>
      </Vertical>
    )
  }
}

const ratingStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    marginBottom: em(0.5)
  },
  bar: {
    flexGrow: 0,
    justifyContent: 'center'
  },
  inactive: {
    opacity: 0.5
  },
  text: {
    fontSize: em(0.75),
    textAlign: 'center'
  }
})

class Rating extends Component {
  render () {
    return (
      <Vertical localStyle={ratingStyles.layout}>
        <Horizontal localStyle={ratingStyles.bar}>
          <Ratings rating={this.props.rating} active={'rgba(255,255,255,1)'} inactive={'rgba(255,255,255,0.2)'} />
        </Horizontal>
        <TextBox localStyle={[text.normal, ratingStyles.text]}>{this.props.rates} rates</TextBox>
      </Vertical>
    )
  }
}

const contactStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    height: em(3.75),
    backgroundColor: 'rgb(255,255,255)',
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderTopColor: 'rgb(220,220,220)'
  },
  wrapper: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: em(1),
    paddingRight: em(1)
  },
  icon: {
    flexGrow: 0,
    alignSelf: 'stretch',
    width: em(1.25),
    marginRight: em(0.5)
  },
  text: {
    color: colors.text_alternate,
    alignSelf: 'center'
  }
})

const Contact = (props) => {
  return (
    <Horizontal localStyle={contactStyles.layout}>
      <View style={contactStyles.wrapper}>
        <View style={contactStyles.icon}>
          <ResponsiveImage icon={'iconPhone'} />
        </View>
        <TextBox localStyle={contactStyles.text}>{props.phone}</TextBox>
      </View>
      <View style={contactStyles.wrapper}>
        <View style={contactStyles.icon}>
          <ResponsiveImage icon={'iconEmail'} />
        </View>
        <TextBox localStyle={contactStyles.text}>{props.email}</TextBox>
      </View>
    </Horizontal>
  )
}

const tabStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    height: em(2),
    paddingLeft: em(1),
    paddingRight: em(1)
  },
  wrapper: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: 'rgb(255,255,255)'
  }
})

const Tabs = (props) => {
  return (
    <Horizontal localStyle={tabStyles.layout}>
      <View style={[tabStyles.wrapper, tabStyles.selectedTab]}>
        <TextBox localStyle={[tabStyles.text]}>Your profile</TextBox>
      </View>
      <View style={tabStyles.wrapper}>
        <TextBox localStyle={[tabStyles.text, text.nomal]}>Personality test</TextBox>
        <Alert />
      </View>
    </Horizontal>
  )
}

const alertStyles = StyleSheet.create({
  layout: {
    position: 'absolute',
    width: em(1.5),
    height: em(1.5),
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ui_2,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(255,255,255)',
    borderRadius: em(0.75)
  },
  text: {
    textAlign: 'center'
  }
})

const Alert = (props) => {
  return (
    <View style={alertStyles.layout}>
      <TextBox localStyle={alertStyles.text}>!</TextBox>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    account: state.workerAccount
  }
}

export default connect(mapStateToProps)(ProfileBlock)
