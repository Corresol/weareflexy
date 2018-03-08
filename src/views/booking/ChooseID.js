import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View
} from 'react-native'
import { connect } from 'react-redux'

import {
  CellSpread,
  CellStart,
  CellCentered
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import ModalButtonOrange from '../../components/ModalButtonOrange'
import ModalButtonGreen from '../../components/ModalButtonGreen'
import TextBox from '../../components/TextBox'
import Button from '../../components/Button'
import { ResponsiveImage } from '../../components/Icons'

import {
  colors,
  em
} from '../../styles'

import {
  setIdType
} from '../../actions'

const typeMap = {
  passport: {
    title: 'EU Passport',
    subTitle: 'Photo page',
    button: 'Passport'
  },
  visa: {
    title: 'Work Visa',
    subTitle: 'Front & Back',
    button: 'Work Visa'
  },
  residence_card: {
    title: 'UK Biometric',
    subTitle: 'Front & Back',
    button: 'Biometric'
  }
}

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
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 0,
    paddingRight: 0
  },
  content: {
    paddingTop: em(1)
  },
  passport: {
    width: 288,
    height: 182
  },
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  }
})

class ChooseID extends Component {
  static viewMenuTitle = 'Upload your ID document'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      type: 'passport'
    }

    this.switchTab = this.switchTab.bind(this)
    this._setType = this._setType.bind(this)
  }

  switchTab (type) {
    this.setState({
      type: type
    })
  }

  _setType () {
    const {
      navigate
    } = this.props.navigation

    const type = this.state.type

    this.props.setIdType(type)
      .then(result => {
        navigate('UploadID')
      })
  }

  render () {
    const {
      navigate
    } = this.props.navigation

    const buttonTitle = 'Upload ' + typeMap[this.state.type].button

    return (
      <Vertical>
        <CellStart localStyle={[styles.noPadding]}>
          <TabBar action={this.switchTab} />
          <CellSpread localStyle={[styles.content]}>
            <TextBox>Please upload a scanned picture of the photo page of your passport, showing all corners and free from glare or flash</TextBox>
            <Image
              source={require('../../../assets/png/icon_passport_large/icon.png')}
              style={styles.passport}
            />
            <ModalButtonGreen
              label={'Why we need your passport'}
              action={() => navigate('WhyDocument')}
            />
          </CellSpread>
        </CellStart>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonOrange
            localStyle={styles.button}
            label={buttonTitle}
            action={this._setType}
          >
            <View style={styles.icon}>
              <ResponsiveImage icon={'iconUploadSmall'} />
            </View>
          </ModalButtonOrange>
        </CellCentered>
      </Vertical>
    )
  }
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

    const tabs = Object.keys(typeMap).map(key => {
      return {
        ...typeMap[key],
        type: key
      }
    })

    const children = tabs.map((tab, index) => {
      return (
        <TabButton
          {...tab}
          key={index}
          active={active === index}
          index={index}
          action={this.changeTab.bind(null, index)}
        />
      )
    })

    return (
      <View style={tabBarStyles.layout}>
        {children}
      </View>
    )
  }
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
    backgroundColor: colors.complete
  },
  inactive: {
    backgroundColor: colors.active
  },
  icon: {
    width: 17,
    height: 18,
    marginRight: em(0.5)
  },
  textSmall: {
    fontSize: em(0.9)
  },
  textLarge: {
    fontSize: em(1.2)
  },
  textBase: {
    color: colors.text_alternate,
    textAlign: 'center'
  },
  textInactive: {
    color: colors.ui_1
  }
})

const TabButton = (props) => {
  const layoutMode = props.active ? tabButtonStyles.active : tabButtonStyles.inactive
  const textMode = props.active ? null : tabButtonStyles.textInactive

  return (
    <View style={[tabButtonStyles.layout, layoutMode]}>
      <Button
        innerStyle={[tabButtonStyles.inner]}
        action={() => { props.action(props.type) }}
        >
        <View>
          <TextBox localStyle={[tabButtonStyles.textBase, tabButtonStyles.textLarge, textMode]}>{props.title}</TextBox>
          <TextBox localStyle={[tabButtonStyles.textBase, tabButtonStyles.textSmall, textMode]}>{props.subTitle}</TextBox>
        </View>
      </Button>
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIdType: (type) => {
      return dispatch(setIdType(type))
    }
  }
}

export default connect(null, mapDispatchToProps)(ChooseID)
