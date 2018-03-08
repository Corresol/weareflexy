import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  newAccount
} from '../../actions'

import {
  StyleSheet,
  View
} from 'react-native'

import {
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import {
  ResponsiveImage
} from '../../components/Icons'

import TextBox from '../../components/TextBox'
import IconButton from '../../components/IconButtonGreen'
import ModalButtonWhite from '../../components/ModalButtonWhite'
import Drawer from '../../containers/Drawer'
import WarningBlock from '../../components/WarningBlock'

import {
  em
} from '../../styles'

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Asap-Regular'
  },
  field: {
    fontSize: em(1.2),
    marginBottom: em(1.5)
  },
  password: {
    fontSize: em(3),
    lineHeight: em(2.5),
    letterSpacing: em(0.25)
  },
  iconEdit: {
    width: 18,
    marginRight: em(0.5)
  },
  warningBox: {
    justifyContent: 'flex-end',
    paddingLeft: 0,
    paddingRight: 0
  }
})

const replaceWithBullets = (text) => {
  if (!text) return

  const length = text.length

  let i = 0

  let bullets = ''

  while (i < length) {
    bullets = bullets + '•'

    i++
  }

  return bullets
}

class Confirmation extends Component {
  static viewMenuTitle = 'Employee new account'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      open: false,
      error: ''
    }
  }

  _createAccount = () => {
    this.props.newAccount()
      .then(data => {
        if (data) {
          this.props.drawer()
        } else {
          this.setState({
            open: true,
            error: 'This email address is already registered!'
          })
        }
      })
  }

  render () {
    const {
      goBack
    } = this.props.navigation

    const {
      register
    } = this.props

    return (
      <Vertical>
        <CellCentered>
          <TextBox localStyle={[styles.label]}>Full name</TextBox>
          <TextBox localStyle={[styles.field]}>{register.firstName} {register.lastName}</TextBox>
          <TextBox localStyle={[styles.label]}>Email</TextBox>
          <TextBox localStyle={[styles.field]}>{register.email}</TextBox>
          <TextBox localStyle={[styles.label]}>Password</TextBox>
          <TextBox localStyle={[styles.field, styles.password]}>{replaceWithBullets(register.password)}</TextBox>
          <TextBox localStyle={[styles.label]}>Telephone number</TextBox>
          <TextBox localStyle={[styles.field]}>{register.phone}</TextBox>
          <IconButton label={'Edit information'} action={() => { goBack() }}>
            <View style={styles.iconEdit}>
              <ResponsiveImage icon={'iconEdit'} />
            </View>
          </IconButton>
        </CellCentered>
        <CellCentered>
          <ModalButtonWhite
            alt
            label={"Ready, let's get started!"}
            action={this._createAccount}
          />
        </CellCentered>
        <Drawer open={this.state.open}>
          <CellCentered localStyle={styles.warningBox}>
            <WarningBlock
              title={'Oops!'}
              message={this.state.error}
              action={() => {
                this.setState({
                  open: false
                })
              }}
              />
          </CellCentered>
        </Drawer>
      </Vertical>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.appCache
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newAccount: () => {
      return dispatch(newAccount())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
