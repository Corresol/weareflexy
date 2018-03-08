import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'

var style = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)'
  }
})

class Spinner extends Component {
  render () {
    if (!this.props.waiting) return null

    return (
      <View style={style.layout}>
        <ActivityIndicator size={'large'} color={'rgb(255,255,255)'} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    waiting: state.app.waiting
  }
}

export default connect(mapStateToProps)(Spinner)
