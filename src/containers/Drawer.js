import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Easing,
  View,
  Dimensions
} from 'react-native'

const styles = StyleSheet.create({
  holder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 100
  },
  layout: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 1,
    zIndex: 100
  }
})

const DURATION = 250

class Drawer extends Component {
  constructor (props) {
    super(props)

    const height = Dimensions.get('window').height

    this.state = {
      open: false,
      height: height,
      offset: 0
    }

    this.top = new Animated.Value(0)

    this.layout = null
  }

  componentWillReceiveProps (nextProps) {
    let openState = false

    if (nextProps.open) {
      openState = true
    }

    this.setState({
      open: openState
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._open()
      } else {
        this._close()
      }
    }
  }

  _open = () => {
    this.top.setValue(0)

    Animated.timing(this.top, {
      toValue: 1,
      duration: DURATION,
      easing: Easing.linear()
    }).start(() => {
      console.log('Drawer opened')
      this.props.openAction && this.props.openAction()
    })
  }

  _close = () => {
    this.top.setValue(1)

    Animated.timing(this.top, {
      toValue: 0,
      duration: DURATION,
      easing: Easing.linear()
    }).start(() => {
      console.log('Drawer closed')
      this.props.closeAction && this.props.closeAction()
    })
  }

  _onLayout = (event) => {
    const {
      height
    } = event.nativeEvent.layout

    // The component may not be at the extreme top of the root
    // Height is already the screen height, so to find the offset, get the height of the holder
    // and subtract it from the screen height for the offset
    const offset = this.state.height - height

    this.setState({
      offset: offset
    })
  }

  render () {
    const {
      height,
      offset
    } = this.state

    // const opacity = this.top.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [0, 0, 1]
    // })

    const translateY = this.top.interpolate({
      inputRange: [0, 1],
      outputRange: [0, (height + offset) * -1]
    })

    const normalise = {
      top: height,
      height: height
    }

    const animated = {
      transform: [
        {
          translateY: translateY
        }
      ]
    }

    return (
      <View
        style={styles.holder}
        pointerEvents={'box-none'}
        onLayout={this._onLayout}
        >
        <Animated.View style={[styles.layout, this.props.style, normalise, animated]}>
          {this.props.children}
        </Animated.View>
      </View>
    )
  }
}

export default Drawer
