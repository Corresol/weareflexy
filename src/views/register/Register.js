import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  createPhone,
  verifyPhone
} from '../../actions'

import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet
} from 'react-native'

import {
  text,
  em
} from '../../styles'

import Form from '../../components/Form'
import ModalFieldWhite from '../../components/ModalFieldWhite'
import ModalFieldGreen from '../../components/ModalFieldGreen'
import ModalButtonOrange from '../../components/ModalButtonOrange'
import ModalButtonWhite from '../../components/ModalButtonWhite'

import {
  CellCentered
} from '../../containers/Cell'

import Slider from '../../components/Slider'
import TextBox from '../../components/TextBox'

import {
  Vertical
} from '../../containers/Grid'

const styles = StyleSheet.create({
  cellStyle: {
    paddingLeft: 0,
    paddingRight: 0
  },
  formStyle: {
    paddingLeft: em(2.25),
    paddingRight: em(2.25)
  },
  navStyle: {
    flexGrow: 0,
    height: em(10)
  },
  sliderStyle: {
    flex: 0,
    height: em(15)
  },
  verifyTextStyle: {
    marginBottom: em(0.5)
  },
  warning: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    paddingRight: em(2.5)
  },
  phoneNumber: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    position: 'absolute',
    top: em(3.25) * -1,
    left: em(2.25),
    right: 0
  }
})

class Register extends Component {
  static viewMenuTitle = 'Employee new account'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      sliderIndex: 0,
      fields: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        smsCode: ''
      },
      completedIndex: [false, false, false, false, false],
      canGoto: 0,
      phoneVerified: true
    }

    this.onSubmit = this.onSubmit.bind(this)
    this._completeSame = this._completeSame.bind(this)
    this._completeFull = this._completeFull.bind(this)

    this.slider = null
  }

  componentDidMount () {
    const registerCache = this.props.cache.register

    if (registerCache) {
      let fields = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        smsCode: ''
      }

      for (var index in fields) {
        if (registerCache[index]) fields[index] = registerCache[index]
      }

      this.setState({
        fields: fields
      })
    }
  }

  onSubmit (values, field, valid) {
    let state = {
      ...this.state
    }

    let form = state.fields

    state.fields = Object.assign(form, values)

    this.setState(state)
  }

  _setCompletedIndex (index, result) {
    let state = this.state

    let completedIndex = state.completedIndex

    completedIndex[index] = result

    this.setState({
      completedIndex: completedIndex
    })
  }

  _completeSame (values, field, index, valid) {
    const check = Object.values(values)

    const test = check[0]

    const verified = check.every(field => field === test)

    const checkValid = Object.values(valid)

    const allValid = checkValid.every(field => field === true)

    if (allValid) {
      this._setCompletedIndex(index, verified)
    } else {
      this._setCompletedIndex(index, false)
    }

    return verified
  }

  _completeSingle (values, field, index, valid) {
    const check = Object.values(values)

    const verified = check[0].length > 0

    this._setCompletedIndex(index, verified)

    return verified
  }

  _completeFull (values, field, index, valid) {
    // const check = Object.values(values)
    const check = Object.values(valid)

    // const verified = check.every(field => field.length > 0)

    const verified = check.every(field => field === true)

    this._setCompletedIndex(index, verified)

    return verified
  }

  _requestSMS (values, field) {
    console.log('Run request for verification now, then goto next index, pulling action to redux')

    let fields = {
      ...this.state.fields
    }

    this.setState({
      fields: fields
    })

    this.props.save(fields)
      .then(value => {
        console.log('Value from promise', value)
        this._nextSlide()
      })
  }

  _verify (values, field) {
    console.log('Check verification now, then goto next page')

    const fields = this.state.fields

    this.setState({
      phoneVerified: true
    })

    this.props.confirm(fields.phone, values.smsCode)
      .then(result => {
        // this.setState({
        //   phoneVerified: true
        // })

        // this.props.navigation.navigate('Confirmation')

        if (result) {
          this.setState({
            phoneVerified: true
          })

          this.props.navigation.navigate('Confirmation')
        } else {
          console.log('Phone verification failed, show warning')
          this.setState({
            phoneVerified: false
          })
        }
      })
  }

  _slideEnded (index) {
    this.setState({
      canGoto: index,
      sliderIndex: index
    })
  }

  _nextSlide () {
    let index = this.state.canGoto

    this.setState({
      canGoto: index + 1
    })
  }

  render () {
    const ghosted = !this.state.completedIndex[this.state.sliderIndex]
    const nextVisible = this.state.sliderIndex < 3

    return (
      <Vertical>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={{
            flex: 1
          }}
        >
          <CellCentered localStyle={styles.cellStyle}>
            <Slider
              index={this.state.canGoto}
              localStyle={styles.sliderStyle}
              ended={(index) => this._slideEnded(index)}
              ref={(slider) => { this.slider = slider }}
            >
              <Name
                firstname={this.state.fields.firstName}
                lastname={this.state.fields.lastName}
                onSubmit={this.onSubmit}
                verify={(values, field, valid) => this._completeFull(values, field, 0, valid)}
                ended={() => this._nextSlide()}
              />
              <Email
                email={this.state.fields.email}
                onSubmit={this.onSubmit}
                verify={(values, field, valid) => this._completeSame(values, field, 1, valid)}
                ended={() => this._nextSlide()}
              />
              <Password
                password={this.state.fields.password}
                onSubmit={this.onSubmit}
                verify={(values, field, valid) => this._completeSame(values, field, 2, valid)}
                ended={() => this._nextSlide()}
              />
              <Phone
                phone={this.state.fields.phone}
                ghosted={ghosted}
                onSubmit={this.onSubmit}
                verify={(values, field) => this._completeSingle(values, field, 3)}
                action={(values, field) => this._requestSMS(values, field)}
              />
              <Verify
                smsCode={this.state.fields.smsCode}
                phone={this.state.fields.phone}
                onSubmit={this.onSubmit}
                verify={(values, field) => this._completeSingle(values, field, 4)}
                ended={(values, field) => this._verify(values, field)}
                success={this.state.phoneVerified}
              />
            </Slider>
          </CellCentered>
          <CellCentered localStyle={styles.navStyle}>
            {nextVisible && <ModalButtonOrange
              ghosted={ghosted}
              label={'Next'}
              action={() => this._nextSlide()}
            />}
          </CellCentered>
        </KeyboardAvoidingView>
      </Vertical>
    )
  }
}

const FormHOC = (props) => {
  return (
    <Form
      {...props}
      localStyle={styles.formStyle}
    >
      {props.children}
    </Form>
  )
}

const Name = (props) => {
  return (
    <FormHOC
      verify={props.verify}
      onSubmit={props.onSubmit}
      ended={props.ended}
      name={'name'}
    >
      <ModalFieldWhite
        value={props.firstname}
        fieldName={'firstName'}
        autoCorrect={false}
        placeholder={'First name'}
        blurOnSubmit={false}
        returnKeyType={'next'}
      />
      <ModalFieldWhite
        value={props.lastname}
        fieldName={'lastName'}
        autoCorrect={false}
        placeholder={'Last name'}
        returnKeyType={'done'}
      />
    </FormHOC>
  )
}

const fieldIsEmail = (text) => {
  const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return validEmail.test(text)
}

const Email = (props) => {
  return (
    <FormHOC
      verify={props.verify}
      onSubmit={props.onSubmit}
      ended={props.ended}
      name={'email'}
      warning={'Addresses must match'}
    >
      <ModalFieldGreen
        validate={fieldIsEmail}
        value={props.email}
        fieldName={'email'}
        keyboardType={'email-address'}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={'Email address'}
        blurOnSubmit={false}
        returnKeyType={'next'}
        showWarning={'Must be a valid email address'}
      />
      <ModalFieldWhite
        fieldName={'confirm'}
        keyboardType={'email-address'}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={'Confirm email address'}
        returnKeyType={'done'}
      />
    </FormHOC>
  )
}

const fieldIsLength = (text) => text.length > 7

const Password = (props) => {
  return (
    <FormHOC
      verify={props.verify}
      onSubmit={props.onSubmit}
      ended={props.ended}
      name={'password'}
      warning={'Passwords must match'}
    >
      <ModalFieldGreen
        validate={fieldIsLength}
        value={props.password}
        fieldName={'password'}
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={'Enter a password'}
        blurOnSubmit={false}
        returnKeyType={'next'}
        showWarning={'Password must be 8 characters'}
      />
      <ModalFieldWhite
        fieldName={'confirm'}
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={'Confirm password'}
        returnKeyType={'done'}
      />
    </FormHOC>
  )
}

const Phone = (props) => {
  return (
    <FormHOC
      verify={props.verify}
      onSubmit={props.onSubmit}
      ended={props.ended}
      name={'phone'}
    >
      <ModalFieldGreen
        value={props.phone}
        keyboardType={'phone-pad'}
        fieldName={'phone'}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={'Phone number'}
        blurOnSubmit={false}
        returnKeyType={'done'}
        showAction
      />
      <ModalButtonWhite
        ghosted={props.ghosted}
        label={'Request verification code'}
        action={props.action}
      />
    </FormHOC>
  )
}

const Verify = (props) => {
  return (
    <FormHOC
      verify={props.verify}
      onSubmit={props.onSubmit}
      ended={props.ended}
      name={'verify'}
    >
      <TextBox localStyle={styles.verifyTextStyle}>
        We've sent you a message. Please enter the code to verify this number. Thank you
      </TextBox>
      <ModalFieldWhite
        value={props.smsCode}
        fieldName={'smsCode'}
        keyboardType={'numeric'}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={'Verification code'}
        blurOnSubmit
        returnKeyType={'done'}
        showAction
      />
      <Number value={props.phone} />
      {!props.success && <Warning />}
    </FormHOC>
  )
}

const Number = (props) => {
  return (
    <View style={[styles.phoneNumber]}>
      <Text style={[text.subtitle]}>{props.value}</Text>
    </View>
  )
}

const Warning = (props) => {
  return (
    <View style={[styles.warning]}>
      <Text style={[text.smallLabel]}>Phone verification code doesn't match</Text>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    warning: state.app.warning,
    cache: state.appCache
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (data) => {
      return dispatch(createPhone(data))
    },
    confirm: (phone, code) => {
      return dispatch(verifyPhone(phone, code))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
