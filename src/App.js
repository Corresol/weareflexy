import React, { Component } from 'react'

import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

import {
  Provider
} from 'react-redux'

import storeInitialiser from './storeInitialiser'

import Root from './containers/Root'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      refreshed: false
    }

    this.store = null
  }

  componentDidMount () {
    storeInitialiser()
      .then(store => {
        this.store = store

        // console.log('Store', store.getState())

        this.setState({
          refreshed: true
        })
      })
  }

  render () {
    if (this.state.refreshed) {
      return <AppRoot store={this.store} />
    }

    return (
      <Loading />
    )
  }
}

const AppRoot = (props) => {
  return (
    <Provider store={props.store}>
      <Root />
    </Provider>
  )
}

const loadingStyles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
})

const Loading = (props) => {
  return (
    <View style={loadingStyles.layout}>
      <ActivityIndicator size={'large'} color={'rgb(0,0,0)'} />
    </View>
  )
}
