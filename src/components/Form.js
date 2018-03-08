import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import {
  text,
  em
} from '../styles'

const style = StyleSheet.create({
  layout: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  warning: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    paddingRight: em(2.5),
    position: 'absolute',
    right: 0,
    bottom: em(0.9) * -1
  }
})

export default class Form extends Component {
  constructor (props) {
    super(props)

    this.fields = []

    this.progress = this.progress.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {
      formVerified: false,
      formComplete: false,
      fields: {}
    }
  }

  componentDidMount () {
    let fields = this.state.fields

    this.fields.forEach((field, index) => {
      let fieldName = this._getFieldName(this.fields[index])

      fields[fieldName] = this.fields[index].props.value ? this.fields[index].props.value : ''
    })

    this.setState({
      fields: fields
    })
  }

  _getFieldName (field) {
    return field.props.fieldName
  }

  onFocus (index) {
    // console.log('Focused', index)
  }

  _internalFieldsValidate () {
    let valid = {}

    this.fields.forEach((field, index) => {
      let fieldName = this._getFieldName(this.fields[index])

      valid[fieldName] = field.checkIsValid(this.state.fields[fieldName])
    })

    return valid
  }

  onChange (index, value, valid) {
    let fieldName = this._getFieldName(this.fields[index])

    let state = this.state

    state.fields[fieldName] = value

    this.setState(state)

    const validFields = this._internalFieldsValidate()

    this.props.onSubmit && this.props.onSubmit(state.fields, this.props.name, validFields)

    if (this.props.verify) {
      let verified = this.props.verify(state.fields, this.props.name, validFields)

      this.setState({
        formVerified: verified
      })
    }
  }

  progress (index) {
    let maxIndex = this.fields.length - 1

    if (index === maxIndex) {
      this.fields[index].blur()

      this.setState({
        formComplete: true
      })

      const validFields = this._internalFieldsValidate()

      this.props.onSubmit && this.props.onSubmit(this.state.fields, this.props.name, validFields)

      if (this.state.formVerified && this.props.ended) {
        this.props.ended(this.state.fields, this.props.name)
      }
    }

    if (index < maxIndex) {
      this.fields[index + 1].focus()

      this.setState({
        formComplete: false
      })
    }
  }

  addField (field, index) {
    if (!field) {
      return
    }

    this.fields[index] = field
  }

  render () {
    let Children = []

    let addField = this.addField.bind(this)

    React.Children.map(this.props.children, (child, index) => {
      if (!child || child === null) return

      let type = child.props.elementType

      let props = {
        onSubmitEditing: this.progress.bind(null, index),
        changeValue: this.onChange.bind(null, index),
        onFocus: this.onFocus.bind(null, index),
        warning: (this.state.formComplete && !this.state.formVerified && this.props.warning),
        ref: (field) => { addField(field, index) },
        key: index
      }

      if (!child) {
        return null
      }

      if (type !== 'inputField') {
        props = {
          key: index
        }
      }

      Children.push(React.cloneElement(child, props))
    })

    const {
      formComplete,
      formVerified
    } = this.state

    return (
      <View style={[style.layout, this.props.localStyle]}>
        {Children}
        {formComplete && !formVerified && this.props.warning && <Warning label={this.props.warning} />}
      </View>
    )
  }
}

const Warning = ({ label }) => {
  return (
    <View style={[style.warning]}>
      <Text style={[text.smallLabel]}>{label}</Text>
    </View>
  )
}
