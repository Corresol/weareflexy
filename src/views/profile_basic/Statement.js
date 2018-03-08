import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'

import {
  setStatement
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
import SpeechBubble from '../../components/SpeechBubble'
import ProfileImage from '../../components/ProfileImage'

import {
  em,
  text,
  colors
} from '../../styles'

const styles = StyleSheet.create({
  layout: {
    overflow: 'hidden'
  },
  text: {
    alignSelf: 'stretch',
    marginBottom: em(1)
  },
  noPadding: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    paddingLeft: 0,
    paddingRight: 0
  },
  content: {
    flexGrow: 1,
    paddingLeft: em(1.125),
    paddingRight: em(1.125)
  },
  padded: {
    flexGrow: 0,
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

const isTwentyCharacters = (text) => text.length > 19

class Statement extends Component {
  static viewMenuTitle = 'Your personal statement'
  static showHeader = true

  constructor (props) {
    super(props)

    this.state = {
      statement: '',
      ghosted: true
    }
  }

  _update = (text) => {
    this.setState({
      statement: text
    })
  }

  _validate = (text) => {
    const valid = isTwentyCharacters(text)

    this.setState({
      ghosted: !valid
    })

    return valid
  }

  _save = () => {
    const {
      navigate
    } = this.props.navigation

    this.props.setStatement(this.state.statement)
      .then(result => {
        if (result) {
          navigate('Confirmation')
        }
      })
  }

  render () {
    const {
      firstName,
      lastName
    } = this.props.account

    const name = `${firstName} ${lastName}`

    return (
      <Vertical localStyle={styles.layout}>
        <KeyboardAvoidingView
          contentContainerStyle={{
            flexGrow: 1
          }}
          behavior={'position'}
          style={{
            flex: 1
          }}
        >
          <CellCentered localStyle={styles.content}>
            <RoundBlob>
              <View style={styles.noPadding}>
                <CellStart localStyle={[styles.noPadding, styles.padded]}>
                  <ProfileBlock
                    name={name}
                  />
                  <TextBox localStyle={[text.subtitle, styles.text]}>We’d now like to hear about you. Just a few sentences about who you are and what you’re looking for</TextBox>
                </CellStart>
                <CellCentered localStyle={styles.noPadding}>
                  <SpeechBubble
                    placeholder={'Your personal statement...'}
                    validate={this._validate}
                    value={this.state.value}
                    changeValue={this._update}
                    showWarning={'Please enter at least twenty characters'}
                  />
                </CellCentered>
              </View>
            </RoundBlob>
          </CellCentered>
          <CellCentered localStyle={styles.holder}>
            <ModalButtonOrange
              localStyle={styles.button}
              ghosted={this.state.ghosted}
              label={'Next'}
              action={this._save}
            />
          </CellCentered>
        </KeyboardAvoidingView>
      </Vertical>
    )
  }
}

const profileStyles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch',
    marginBottom: em(1.5)
  },
  image: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    width: em(3),
    marginRight: em(1)
  },
  wrapper: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})

const ProfileBlock = (props) => {
  return (
    <View style={profileStyles.layout}>
      <View style={profileStyles.image}>
        <ProfileImage
          size={3}
        />
      </View>
      <View style={profileStyles.wrapper}>
        <TextBox localStyle={text.subtitle}>{props.name}</TextBox>
      </View>
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatement: (statement) => {
      return dispatch(setStatement(statement))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.workerAccount
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statement)
