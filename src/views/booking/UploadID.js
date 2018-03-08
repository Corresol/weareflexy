import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  uploadFiles
} from '../../actions'

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
import RoundBlob from '../../components/RoundBlob'
import Button from '../../components/Button'
import { ResponsiveImage } from '../../components/Icons'

import Drawer from '../../containers/Drawer'
import Camera from '../../components/Camera'
import UploadIcon from '../../components/UploadIconSquare'

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
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadTitle: {
    marginTop: em(1),
    alignSelf: 'center'
  },
  button: {
    borderWidth: 2,
    borderColor: colors.complete
  }
})

const typeMap = {
  passport: {
    title: 'EU Passport',
    subTitle: 'Photo page',
    button: 'Passport',
    amount: 1
  },
  visa: {
    title: 'Work Visa',
    subTitle: 'Front & Back',
    button: 'Work Visa',
    amount: 2
  },
  residence_card: {
    title: 'UK Biometric',
    subTitle: 'Front & Back',
    button: 'Biometric',
    amount: 2
  }
}

class Upload extends Component {
  static viewMenuTitle = 'Upload your ID document'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      open: false,
      attachments: [],
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
    let attachments = this.state.attachments

    const type = typeMap[this.props.idType]

    if (type.amount > 1) {
      attachments.push(url)
    } else {
      attachments = [url]
    }

    this.setState({
      attachments: attachments,
      ghosted: false
    })
  }

  _sendImages = () => {
    const {
      navigate
    } = this.props.navigation

    const type = this.props.idType

    this.props.setAttachments(this.state.attachments, type)
      .then(data => {
        console.log('Ready to upload', data)

        if (data) {
          navigate('ChooseCall')
        }
      })
  }

  render () {
    let profileIcon = uploadLargeGreen
    let iconActive = false

    // Extend this so that when multiple documents implemented images can be mapped to each instance
    if (this.state.attachments.length > 0) {
      profileIcon = {uri: this.state.attachments[0]}
      iconActive = true
    }

    const type = typeMap[this.props.idType]

    return (
      <Vertical>
        <CellCentered localStyle={styles.content}>
          <RoundBlob>
            <View style={styles.noPadding}>
              <CellStart localStyle={[styles.noPadding, styles.padded]}>
                <TextBox localStyle={[text.subtitle, styles.text]}>{type.title}</TextBox>
              </CellStart>
              <CellCentered localStyle={styles.noPadding}>
                <RoundBlob localStyle={styles.uploadContainer}>
                  <UploadIcon active={iconActive} image={profileIcon} action={this._openDrawer} />
                  <TextBox localStyle={[text.bold, styles.uploadTitle]}>{type.subTitle}</TextBox>
                </RoundBlob>
              </CellCentered>
            </View>
          </RoundBlob>
        </CellCentered>
        <CellCentered localStyle={styles.holder}>
          <ModalButtonOrange
            localStyle={styles.button}
            ghosted={this.state.ghosted}
            label={'Upload your ID document'}
            action={this._sendImages}
          >
            <View style={styles.icon}>
              <ResponsiveImage icon={'iconUploadSmall'} />
            </View>
          </ModalButtonOrange>
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

const mapStateToProps = (state) => {
  return {
    idType: state.appCache.attachmentType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAttachments: (data, type) => {
      return dispatch(uploadFiles(data, type))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
