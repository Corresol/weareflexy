import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  uploadProfileImage
} from '../../actions'

import {
  CellCentered,
  CellStart
} from '../../containers/Cell'

import {
  Vertical
} from '../../containers/Grid'

import TextBox from '../../components/TextBox'
import ModalButtonOrange from '../../components/ModalButtonOrange'
import RoundBlob from '../../components/RoundBlob'
import Button from '../../components/Button'
import { ResponsiveImage } from '../../components/Icons'

import Drawer from '../../containers/Drawer'
import Camera from '../../components/Camera'
import UploadIcon from '../../components/UploadIcon'

import {
  em,
  text,
  colors
} from '../../styles'

const uploadLargeGreen = require('../../../assets/png/image_upload_large_green/image.png')

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
  },
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  }
})

class Upload extends Component {
  static viewMenuTitle = 'Upload a profile picture'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      open: false,
      image: null,
      ghosted: true
    }
  }

  _openDrawer = () => {
    const open = this.state.open

    this.setState({
      open: !open
    })
  }

  _setImage = (url) => {
    this.setState({
      image: url,
      ghosted: false
    })
  }

  _upload = () => {
    const {
      navigate
    } = this.props.navigation

    const file = this.state.image

    this.props.setProfileImage(file)
      .then(result => {
        if (result) {
          navigate('Statement')
        }
      })
  }

  render () {
    let profileIcon = uploadLargeGreen
    let iconActive = false

    if (this.state.image) {
      profileIcon = {uri: this.state.image}
      iconActive = true
    }

    return (
      <Vertical>
        <CellCentered localStyle={styles.content}>
          <RoundBlob>
            <View style={styles.noPadding}>
              <CellStart localStyle={[styles.noPadding, styles.padded]}>
                <TextBox localStyle={[text.subtitle, styles.text]}>Let’s start from the basics.</TextBox>
                <TextBox localStyle={[text.subtitle, styles.text]}>You haven’t taken or uploaded a profile picture. You can do that now. We recommend this picture to be clean and look professional, similar to what Passport pictures look like.</TextBox>
              </CellStart>
              <CellCentered localStyle={styles.noPadding}>
                <UploadIcon active={iconActive} image={profileIcon} action={this._openDrawer} />
              </CellCentered>
            </View>
          </RoundBlob>
        </CellCentered>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonOrange
            localStyle={styles.button}
            ghosted={this.state.ghosted}
            label={'Next'}
            action={this._upload}
          />
        </CellCentered>
        <Drawer open={this.state.open}>
          <CameraDrawer action={this._setImage} close={this._openDrawer} />
        </Drawer>
      </Vertical>
    )
  }
}

const drawerStyles = StyleSheet.create({
  layout: {
    paddingTop: em(1.5),
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexGrow: 0,
    flexShrink: 0,
    height: em(5)
  },
  close: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(2.375)
  },
  icon: {
    flexGrow: 0,
    width: em(1.125)
  }
})

class CameraDrawer extends Component {
  _save = (url) => {
    this.props.action(url)

    this.props.close()
  }

  render () {
    return (
      <Vertical localStyle={drawerStyles.layout}>
        <View style={drawerStyles.header}>
          <View style={drawerStyles.close}>
            <Button action={this.props.close} innerStyle={drawerStyles.icon}>
              <ResponsiveImage icon={'iconClose'} />
            </Button>
          </View>
        </View>
        <Camera action={this._save} />
      </Vertical>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProfileImage: (data) => {
      return dispatch(uploadProfileImage(data))
    }
  }
}

export default connect(null, mapDispatchToProps)(Upload)
