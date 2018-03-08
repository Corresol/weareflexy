import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  Keyboard,
  Dimensions
} from 'react-native'

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignSelf: 'stretch',
    overflow: 'hidden'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flex: 1
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  coinWrapper: {
    flexDirection: 'row',
    flex: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32
  },
  coin: {
    flex: 0,
    width: 8,
    height: 8,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  coinActive: {
    flex: 0,
    width: 8,
    height: 8,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)'
  }
})

const DURATION = 250

class Slider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      index: 0,
      maxLength: 0,
      width: Dimensions.get('window').width,
      children: [],
      hasLayout: false
    }

    this.leftPosition = new Animated.Value(0)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.index !== this.state.index) {
      this._animateTo(nextProps.index)
    }
  }

  _animateTo (index, duration) {
    const end = (index * this.state.width) * -1

    Animated.timing(this.leftPosition, {
      toValue: end,
      duration: duration,
      easing: Easing.linear()
    }).start(() => {
      this.setState({
        index: index
      })

      this.props.ended && this.props.ended(index)
    })
  }

  render () {
    const length = React.Children.count(this.props.children)

    const style = {
      width: this.state.width * length,
      transform: [
        {
          translateX: this.leftPosition
        }
      ]
    }

    let children = React.Children.map(this.props.children, child => {
      return (
        <Cell>
          {child}
        </Cell>
      )
    })

    const responder = PanResponder.create({
      onPanResponderTerminate: () => {
        this._isResponding = false
      },
      onPanResponderGrant: (event) => {
        this.leftPosition.stopAnimation((value) => {
          this._isResponding = true
          this._refStartValue = event.nativeEvent.pageX
          this._positionStartValue = value

          Keyboard.dismiss()
        })
      },
      onMoveShouldSetPanResponder: (event, gesture) => {
        const distance = Math.abs(gesture.dx)

        if (distance > 30) {
          return (this.props.free ? true : this.state.index !== 0)
        } else {
          return false
        }
      },
      onPanResponderMove: (event, gesture) => {
        let screenX = event.nativeEvent.pageX

        if (!this.props.free) {
          if (screenX >= this._refStartValue) {
            let value = this._positionStartValue + gesture.dx

            this.leftPosition.setValue(value)
          }
        } else {
          let value = this._positionStartValue + gesture.dx

          this.leftPosition.setValue(value)
        }
      },
      onPanResponderTerminationRequest: () => {
        let index = this.state.index

        this._animateTo(index, DURATION)

        return true
      },
      onPanResponderRelease: (event, gesture) => {
        if (!this._isResponding) {
          return
        }

        this._isResponding = false

        // Percentage of travel
        const direction = (100 / this.state.width) * gesture.dx

        const threshold = Math.abs(direction)

        const index = this.state.index
        const max = this.state.maxLength

        if (this.props.free) {
          if (threshold > 30) {
            const scrollTo = (
              direction > 0 ? (
                  index - 1 >= 0 ? index - 1 : index
                ) : (
                  index + 1 < max ? index + 1 : index
                )
            )

            this._animateTo(scrollTo, DURATION)
          } else {
            this._animateTo(index, DURATION)
          }
        } else {
          if (threshold > 30 && index - 1 >= 0) {
            this._animateTo(index - 1, DURATION)
          } else {
            this._animateTo(index, DURATION)
          }
        }
      }
    })

    return (
      <View
        {...responder.panHandlers}
        style={[styles.layout, this.props.localStyle]}
        onLayout={(event) => {
          let {
            width
          } = event.nativeEvent.layout

          this.setState({
            width: width,
            maxLength: length,
            hasLayout: true
          })
        }}
      >
        <Animated.View style={[styles.wrapper, style]}>
          {children}
        </Animated.View>
        <Coins length={length} active={this.state.index} />
      </View>
    )
  }
}

class Coins extends Component {
  render () {
    let children = []
    let i = 0

    while (i < this.props.length) {
      let style = i === this.props.active ? styles.coin : styles.coinActive

      children.push((
        <View key={i} style={style} />
      ))

      i++
    }

    return (
      <View style={styles.coinWrapper}>
        {children}
      </View>
    )
  }
}

class Cell extends Component {
  render () {
    return (
      <View style={styles.cell}>
        {this.props.children}
      </View>
    )
  }
}

export default Slider
