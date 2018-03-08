import React, { Component } from 'react'
import {
  StyleSheet,
  Image
} from 'react-native'

import {
  CellStart
} from '../containers/Cell'

import TextBox from './TextBox'
import Button from './Button'

import {
  em
} from '../styles'

const ImagePicker = require('react-native-image-picker')

const IMAGE_OPTIONS = {
  noData: true,
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    cameraRoll: true,
    waitUntilSaved: true
  }
}

const styles = StyleSheet.create({
  layout: {
    alignSelf: 'stretch'
  },
  button: {
    flexGrow: 0,
    alignSelf: 'center',
    marginTop: em(1),
    marginBottom: em(1)
  },
  buttonInner: {

  },
  buttonIcon: {
    marginRight: em(1)
  },
  buttonText: {
    alignSelf: 'center'
  }
})

export default class Camera extends Component {
  constructor (props) {
    super(props)

    this._saveImage = this._saveImage.bind(this)
    this._pickFromCamera = this._pickFromCamera.bind(this)
    this._pickFromGallery = this._pickFromGallery.bind(this)
  }

  _pickFromGallery () {
    const send = this._saveImage.bind(this)

    ImagePicker.launchImageLibrary(IMAGE_OPTIONS, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        send(response.uri, response)
      }
    })
  }

  _pickFromCamera () {
    const send = this._saveImage.bind(this)

    ImagePicker.launchCamera(IMAGE_OPTIONS, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        send(response.uri, response)
      }
    })
  }

  _saveImage (data, response) {
    this.props.action(data, response)
  }

  render () {
    return (
      <CellStart localStyle={styles.layout}>
        <TextBox>Select from:</TextBox>
        <Button
          localStyle={styles.button}
          action={this._pickFromCamera}
        >
          <Image
            source={require('../../assets/png/icon_camera/icon.png')}
            style={[styles.buttonIcon, { width: 47, height: 37 }]}
          />
          <TextBox localStyle={styles.buttonText}>Camera</TextBox>
        </Button>
        <Button
          localStyle={styles.button}
          action={this._pickFromGallery}
        >
          <Image
            source={require('../../assets/png/icon_library/icon.png')}
            style={[styles.buttonIcon, { width: 39, height: 39 }]}
          />
          <TextBox localStyle={styles.buttonText}>Gallery</TextBox>
        </Button>
      </CellStart>
    )
  }
}
