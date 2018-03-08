import React, { Component } from 'react'

import {
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import ScrollContainer from '../containers/ScrollContainer'
import { ResponsiveImage } from './Icons'
import RoundBlob from './RoundBlob'
import TextBox from './TextBox'

import {
  em,
  colors
} from '../styles'

class MultiSelect extends Component {
  render () {
    return (
      <ScrollContainer>
        <Option action={this.props.action} />
        <Option action={this.props.action} />
        <Option action={this.props.action} />
        <Option action={this.props.action} />
        <Option action={this.props.action} />
        <Option action={this.props.action} />
        <Option action={this.props.action} />
        <Option action={this.props.action} />
      </ScrollContainer>
    )
  }
}

const optionStyles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  inflexible: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  flexible: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: em(1)
  },
  flexibleWrapper: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: em(1)
  },
  text: {
    color: colors.text_alternate
  },
  blob: {
    backgroundColor: 'rgb(255,255,255)',
    padding: em(0.75),
    marginBottom: em(1.3)
  },
  blobSelected: {
    backgroundColor: colors.ui_1,
    padding: em(0.75),
    marginBottom: em(1.3)
  }
})

const optionTextSelected = StyleSheet.create({
  title: {
    color: colors.complete
  },
  label: {
    color: colors.complete
  }
})

const optionText = StyleSheet.create({
  title: {
    color: colors.text_alternate
  },
  label: {
    color: colors.ui_1
  }
})

class Option extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: false
    }
  }

  _select = () => {
    const selected = this.state.selected

    this.setState({
      selected: !selected
    })

    this.props.action && this.props.action()
  }

  render () {
    const blobStyle = this.state.selected ? optionStyles.blobSelected : optionStyles.blob
    const textStyle = this.state.selected ? optionTextSelected : optionText
    const label = this.state.selected ? 'selected' : 'select'

    return (
      <RoundBlob localStyle={blobStyle} >
        <TouchableHighlight
          onPress={this._select}
          underlayColor={'rgba(0,0,0,0)'}
        >
          <View style={optionStyles.layout}>
            <View style={optionStyles.flexible}>
              <TextBox localStyle={textStyle.title}>Not in my comfort zone</TextBox>
            </View>
            <View style={optionStyles.flexibleWrapper}>
              <View style={optionStyles.flexible}>
                <TextBox localStyle={textStyle.label}>{label}</TextBox>
              </View>
              <View style={optionStyles.inflexible}>
                <Icon />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </RoundBlob>
    )
  }
}

const iconStyles = StyleSheet.create({
  layout: {
    width: 18,
    height: 18
  }
})

const Icon = (props) => {
  return (
    <View style={iconStyles.layout}>
      <ResponsiveImage icon={'iconCompleteWhite'} />
    </View>
  )
}

export default MultiSelect
