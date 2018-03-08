import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'

import {
  CellCentered
} from '../../containers/Cell'

import {
  finaliseAppointment
} from '../../actions'

import {
  Vertical
} from '../../containers/Grid'

import Form from '../../components/Form'
import ModalFieldWhite from '../../components/ModalFieldWhite'
import ModalFieldGreen from '../../components/ModalFieldGreen'
import ModalButtonOrange from '../../components/ModalButtonOrange'
import TextBox from '../../components/TextBox'
import Button from '../../components/Button'
import RoundBlob from '../../components/RoundBlob'
import { ResponsiveImage } from '../../components/Icons'

import {
  colors,
  em
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
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  },
  message: {
    marginTop: em(1),
    marginBottom: em(1)
  }
})

const placeholders = {
  whatsapp: 'WhatsApp number',
  skype: 'Skype id',
  facetime: 'Facetime number'
}

const titles = {
  whatsapp: 'WhatsApp',
  skype: 'Skype',
  facetime: 'Facetime'
}

class ChooseCall extends Component {
  static viewMenuTitle = 'Choose video call platform'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      ghosted: true,
      callType: 'whatsapp',
      contact: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.ended = this.ended.bind(this)
    this.switchTab = this.switchTab.bind(this)
    this._finish = this._finish.bind(this)
  }

  _verify (values, field) {
    const check = Object.values(values)

    const test = check[0]

    const verified = check.every(field => field === test)

    this.setState({
      ghosted: !verified
    })

    return verified
  }

  switchTab (index) {
    this.setState({
      callType: index
    })
  }

  onSubmit (values, field) {
    let contact = this.state.contact

    contact = values.contact

    this.setState({
      contact: contact
    })
  }

  ended () {
    console.log('Form Ended')
  }

  _finish () {
    const {
      callType,
      contact
    } = this.state

    const {
      navigate
    } = this.props.navigation

    this.props.finalise(callType, contact)
      .then(done => {
        if (done) navigate('AppointmentConfirm')
      })
  }

  render () {
    const placeholderField = 'Your ' + placeholders[this.state.callType]
    const placeholderConfirm = 'Confirm your ' + placeholders[this.state.callType]
    const title = titles[this.state.callType]

    return (
      <Vertical localStyle={{
        overflow: 'hidden'
      }}>
        <KeyboardAvoidingView
          contentContainerStyle={{
            flexGrow: 1
          }}
          behavior={'position'}
          style={{
            flex: 1
          }}
        >
          <Photo attachment={this.props.attachments[0]} />
          <CellCentered>
            <TabBar action={this.switchTab} />
            <TextBox localStyle={styles.message}>{title}</TextBox>
            <Form
              verify={(values, field) => this._verify(values, field)}
              onSubmit={this.onSubmit}
              ended={this.ended}
              name={'contact'}
              warning={'Details must match'}
            >
              <ModalFieldGreen
                value={this.state.contact}
                fieldName={'contact'}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder={placeholderField}
                blurOnSubmit={false}
                returnKeyType={'next'}
              />
              <ModalFieldWhite
                fieldName={'confirm'}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder={placeholderConfirm}
                returnKeyType={'done'}
              />
            </Form>
          </CellCentered>
          <CellCentered localStyle={styles.holder}>
            <ModalButtonOrange
              ghosted={this.state.ghosted}
              localStyle={styles.button}
              label={"We're done. Thank you"}
              action={this._finish}
            >
              <View style={styles.icon}>
                <ResponsiveImage icon={'iconCompleteWhite'} />
              </View>
            </ModalButtonOrange>
          </CellCentered>
        </KeyboardAvoidingView>
      </Vertical>
    )
  }
}

const photoStyles = StyleSheet.create({
  wrapper: {
    flexGrow: 0,
    flexShrink: 1
  },
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  image: {
    width: em(6.5),
    height: em(6.5),
    marginRight: em(1)
  },
  message: {
    flexShrink: 1
  }
})

const Photo = (props) => {
  return (
    <CellCentered localStyle={photoStyles.wrapper}>
      <RoundBlob>
        <View style={photoStyles.layout}>
          <Image
            source={{ uri: props.attachment }}
            style={photoStyles.image}
          />
          <TextBox localStyle={photoStyles.message}>Passport successfully uploaded!</TextBox>
        </View>
      </RoundBlob>
    </CellCentered>
  )
}

const tabBarStyles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    height: em(4.75)
  }
})

class TabBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      index: 0
    }

    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (index, title) {
    this.setState({
      index: index
    })

    this.props.action(title)
  }

  render () {
    const active = this.state.index

    const tabs = [
      {
        button: 'whatsapp',
        icon: Whatsapp
      },
      {
        button: 'skype',
        icon: Skype
      },
      {
        button: 'facetime',
        icon: Facetime
      }
    ]

    const children = tabs.map((tab, index) => {
      const Icon = tab.icon

      return (
        <TabButton
          button={tab.button}
          key={index}
          active={active === index}
          index={index}
          action={this.changeTab.bind(null, index)}
        >
          <Icon />
        </TabButton>
      )
    })

    return (
      <View style={tabBarStyles.layout}>
        {children}
      </View>
    )
  }
}

const Skype = (props) => {
  return (
    <Image
      source={require('../../../assets/png/icon_skype/icon.png')}
      style={{ width: 64, height: 64 }}
    />
  )
}

const Whatsapp = (props) => {
  return (
    <Image
      source={require('../../../assets/png/icon_whatsapp/icon.png')}
      style={{ width: 64, height: 64 }}
    />
  )
}

const Facetime = (props) => {
  return (
    <Image
      source={require('../../../assets/png/icon_facetime/icon.png')}
      style={{ width: 64, height: 64 }}
    />
  )
}

const tabButtonStyles = StyleSheet.create({
  layout: {
    flex: 1
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  active: {
    opacity: 1
  },
  inactive: {
    opacity: 0.5
  }
})

const TabButton = (props) => {
  const layoutMode = props.active ? tabButtonStyles.active : tabButtonStyles.inactive

  return (
    <View style={[tabButtonStyles.layout, layoutMode]}>
      <Button
        innerStyle={[tabButtonStyles.inner]}
        action={() => { props.action(props.button) }}
        >
        <View>
          {props.children}
        </View>
      </Button>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    attachments: state.appCache.attachments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    finalise: (platform, platformIdentity) => {
      return dispatch(finaliseAppointment(platform, platformIdentity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCall)
