import React, { Component } from 'react'

import {
  StyleSheet
} from 'react-native'

import {
  em
} from '../../styles'

import Button from '../Button'
import { ResponsiveImage } from '../Icons'

const styles = StyleSheet.create({
  holder: {
    flexGrow: 0,
    width: em(2.75)
  },
  icon: {
    flexGrow: 0,
    width: em(1.125)
  }
})

class Search extends Component {
  render () {
    return (
      <Button
        action={this.props.action}
        localStyle={styles.holder}
        innerStyle={styles.icon}
        >
        <ResponsiveImage icon={'iconSearch'} />
      </Button>
    )
  }
}

export default Search
