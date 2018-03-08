import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import Field from './Field'
import PanOverride from './PanOverride'

import {
  em,
  text,
  box,
  colors
} from '../styles'

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-end'
  },
  override: {
    flexGrow: 1,
    marginBottom: 0,
    borderTopLeftRadius: em(0.6),
    borderTopRightRadius: em(0.6),
    borderBottomLeftRadius: em(0.6),
    borderBottomRightRadius: 0
  },
  holder: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})

// MODES
// empty
// focused
// complete
// warning

const isNotEmpty = (text) => text.length > 0

export default class SpeechBubble extends Component {
  static defaultProps = {
    elementType: 'speechBubble'
  }

  constructor (props) {
    super(props)

    this.state = {
      mode: 'empty',
      filled: false
    }

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount () {
    if (this.props.value) this.validate(this.props.value)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.validate(nextProps.value)
    }
  }

  validate (text) {
    this.setState({
      filled: this.props.validate ? this.props.validate(text) : isNotEmpty(text)
    })

    this.props.changeValue(text)
  }

  onFocus () {
    this.setState({
      mode: 'focused'
    })

    this.props.onFocus && this.props.onFocus()
  }

  onBlur () {
    this.setState({
      mode: 'empty'
    })

    this.props.onBlur && this.props.onBlur()
  }

  focus () {
    this.field._input.focus()
  }

  blur () {
    this.field._input.blur()
  }

  render () {
    let finished = this.state.filled
    let mode = (finished ? (this.props.warning ? box.warning : box.complete) : box.inactive)

    let triangleColor = (finished ? (this.props.warning ? colors.warning : colors.complete) : colors.inactive)

    let doneShow = false

    let displayWarning = false

    if (this.state.mode === 'focused') {
      mode = box.active
      finished = false
      doneShow = true
      triangleColor = colors.active
      displayWarning = this.props.showWarning && !this.state.filled
    }

    let fieldColor = (finished ? (this.props.warning ? text.normal : text.complete) : text.normal)

    return (
      <View style={styles.layout}>
        <View style={[box.button, styles.override, this.props.localStyle, mode]}>
          <PanOverride style={styles.holder}>
            <Field
              {...this.props}
              multiline
              onChangeText={this.validate}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.props.value}
              placeholder={this.props.placeholder}
              placeholderTextColor={colors.text_primary}
              localStyle={[fieldColor, box.padding]}
              ref={(field) => { this.field = field }}
            />
          </PanOverride>
          {doneShow && <Done label={'DONE'} action={this.blur.bind(this)} />}
          {displayWarning && <WarningText label={this.props.showWarning} />}
        </View>
        <TriangleCorner color={triangleColor} />
      </View>
    )
  }
}

const warningStyles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: em(1.5) * -1,
    right: 0,
    height: em(1.5)
  }
})

const WarningText = (props) => {
  return (
    <View style={warningStyles.layout}>
      <Text style={text.bold}>{props.label}</Text>
    </View>
  )
}

const doneStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: em(0.5),
    marginBottom: em(0.5),
    marginRight: em(0.25),
    paddingLeft: em(0.5),
    paddingRight: em(0.5),
    borderRadius: em(0.25),
    backgroundColor: colors.ui_2
  },
  title: {
    fontSize: em(0.75)
  }
})

const Done = (props) => {
  return (
    <View style={doneStyles.layout}>
      <TouchableHighlight
        onPress={props.action}
        underlayColor={'rgba(0,0,0,0)'}
      >
        <Text style={[text.bold, doneStyles.title]}>{props.label}</Text>
      </TouchableHighlight>
    </View>
  )
}

var cornerStyle = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: em(1),
  borderTopWidth: em(1),
  borderLeftColor: 'transparent',
  borderTopColor: colors.inactive
}

const TriangleCorner = (props) => {
  const background = {
    borderTopColor: props.color
  }

  return (
    <View collapsable={false} style={[cornerStyle, background]} />
  )
}
