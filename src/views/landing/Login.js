import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View
} from 'react-native'

import {
  doLogin
} from '../../actions'

import {
  NavigationActions
} from 'react-navigation'

import ModalFieldWhite from '../../components/ModalFieldWhite'
import ModalButtonOrange from '../../components/ModalButtonOrange'
import ModalButtonGreen from '../../components/ModalButtonGreen'
import Link from '../../components/Link'
import Form from '../../components/Form'

import {
  em
} from '../../styles'

import {
  CellStart
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import {
  ResponsiveImage
} from '../../components/Icons'

class Login extends Component {
  static viewMenuTitle = 'Please Login'
  static showHeader = false
  static background = true

  constructor (props) {
    super(props)

    this.state = {
      ghosted: true,
      username: '',
      password: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this._login = this._login.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const nextIndex = nextProps.navigation.state.index

    console.log('Next Index', nextProps.currentIndex, this.props.currentIndex)
    if (nextIndex !== 0) {
      console.log('Navigated away', nextIndex)
    }
  }

  onSubmit (values) {
    let state = Object.assign(this.state, values)

    this.setState(state)
  }

  _complete (values) {
    let check = Object.values(values)

    let verified = check.every(field => field.length > 0)

    let state = this.state

    state.ghosted = !verified

    this.setState(state)
  }

  _completeFull (values, field) {
    let check = Object.values(values)

    let verified = check.every(field => field.length > 0)

    this.setState({
      ghosted: !verified
    })

    return verified
  }

  _login () {
    this.props.doLogin(this.state.username, this.state.password)
  }

  render () {
    return (
      <Vertical>
        <Logo />
        <CellStart>
          <Form
            name={'login'}
            onSubmit={this.onSubmit}
            verify={this._completeFull.bind(this)}
            >
            <ModalFieldWhite
              value={this.state.username}
              fieldName={'username'}
              autoCapitalize='none'
              autoCorrect={false}
              placeholder={'Enter email address'}
              blurOnSubmit={false}
              keyboardType={'email-address'}
              returnKeyType={'next'}
            />
            <ModalFieldWhite
              value={this.state.password}
              fieldName={'password'}
              placeholder={'Enter password'}
              secureTextEntry
              returnKeyType={'done'}
            />
          </Form>
          <Link label={'Forgotten password?'} />
          <ModalButtonOrange
            ghosted={this.state.ghosted}
            label={'Log in'}
            action={this._login}
          />
          <ModalButtonGreen
            label={'Create a new Flexy account'}
            action={this.props.drawer}
          />
        </CellStart>
      </Vertical>
    )
  }
}

const logoStyle = {
  flexGrow: 0,
  flexShrink: 0,
  height: 108,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  marginTop: em(4.5),
  marginBottom: em(4.5)
}

const Logo = () => (
  <View style={logoStyle}>
    <ResponsiveImage icon={'logoVertical'} />
  </View>
)

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (email, password) => {
      return dispatch(doLogin(email, password))
    },
    setBackground: () => {
      return dispatch({
        type: 'APP_BACKGROUND',
        data: true
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
