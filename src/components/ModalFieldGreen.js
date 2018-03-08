import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import Field from './Field'
import PanOverride from './PanOverride'
import {
  ResponsiveImage
} from './Icons'

import {
  em,
  text,
  box,
  colors
} from '../styles'

const override = {
  flexDirection: 'row'
}

const styles = StyleSheet.create({
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

const fieldStyles = StyleSheet.create({
  complete: {
    backgroundColor: colors.ui_1
  },
  waiting: {
    backgroundColor: colors.ui_2
  }
})

export default class ModalField extends Component {
  static defaultProps = {
    elementType: 'inputField'
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

  checkIsValid (text) {
    const valid = this.props.validate ? this.props.validate(text) : isNotEmpty(text)

    return valid
  }

  validate (text) {
    const valid = this.checkIsValid(text)

    this.setState({
      filled: valid
    })

    this.props.changeValue(text, valid)
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
    let mode = (
      finished ? (
        this.props.warning ? box.warning : fieldStyles.complete
      ) : box.inactive
    )

    let doneShow = false
    let displayWarning = this.props.showWarning && !this.state.filled && this.props.value.length > 0

    if (this.state.mode === 'focused') {
      mode = box.active
      finished = false
      doneShow = this.props.showAction
    }

    let Icon = (
      finished ? (
        this.props.warning ? Warning : Complete
      ) : Required
    )

    // let fieldColor = (
    //   finished ? (
    //     this.props.warning ? text.normal : text.normal
    //   ) : text.normal
    // )

    return (
      <View style={[box.button, override, this.props.localStyle, mode]}>
        <PanOverride style={styles.holder}>
          <Field
            {...this.props}
            onChangeText={this.validate}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.props.value}
            placeholder={this.props.placeholder}
            placeholderTextColor={colors.text_primary}
            localStyle={[text.normal, box.padding]}
            ref={(field) => { this.field = field }}
          />
        </PanOverride>
        {doneShow && <Done label={'DONE'} action={this.blur.bind(this)} />}
        {displayWarning && <WarningText label={this.props.showWarning} />}
        <Icon />
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
    alignSelf: 'stretch',
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

const iconStyles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: em(2.5),
    marginRight: em(0.6)
  },
  required: {
    width: 10
  },
  complete: {
    width: 18
  },
  warning: {
    width: 14
  }
})

class Required extends Component {
  render () {
    return (
      <View style={[iconStyles.layout, iconStyles.required]}>
        <ResponsiveImage icon={'iconMandatory'} />
      </View>
    )
  }
}

class Warning extends Component {
  render () {
    return (
      <View style={[iconStyles.layout, iconStyles.warning]}>
        <ResponsiveImage icon={'iconClose'} />
      </View>
    )
  }
}

class Complete extends Component {
  render () {
    return (
      <View style={[iconStyles.layout]} />
    )
  }
}
