const horResponder = () => {
  const responder = PanResponder.create({
      onPanResponderTerminate: () => {
        this._isResponding = false
        this._reset(index, 0, position)
      },
      onPanResponderGrant: () => {
        position.stopAnimation((value) => {
          this._isResponding = true
          this._gestureStartValue = value
        })
      },
      onMoveShouldSetPanResponder: (event, gesture) => {
        if (index !== scene.index) {
          return false
        }
        const immediateIndex = this._immediateIndex == null ? index : this._immediateIndex
        const width = layout.width.__getValue()
        const widthHasBeenMeasured = !!width

        // Measure the distance from the touch to the edge of the screen
        const screenEdgeDistance = event.nativeEvent.pageX - gesture.dx
        // Compare to the gesture distance relavant to card or modal
        // GESTURE_RESPONSE_DISTANCE is about 25 or 30. Or 135 for modals
        if (screenEdgeDistance > GESTURE_RESPONSE_DISTANCE) {
          // Reject touches that started in the middle of the screen
          return false
        }

        const hasDraggedEnough = Math.abs(gesture.dx) > RESPOND_THRESHOLD

        const isOnFirstCard = (immediateIndex === 0)

        return (hasDraggedEnough && widthHasBeenMeasured && !isOnFirstCard)
      },
      onPanResponderMove: (event, gesture) => {
        // Handle the moving touches for our granted responder
        const startValue = this._gestureStartValue
        const distance = layout.width.__getValue()
        const currentValue = startValue - gesture.dx / distance
        const value = clamp(index - 1, currentValue, index)
        position.setValue(value)
      },
      onPanResponderTerminationRequest: () =>
        // Returning false will prevent other views from becoming responder while
        // the navigation view is the responder (mid-gesture)
        false,
      onPanResponderRelease: (event, gesture) => {
        if (!this._isResponding) {
          return
        }

        this._isResponding = false

        const immediateIndex = this._immediateIndex == null ? index : this._immediateIndex

        // Calculate animate duration according to gesture speed and moved distance
        const distance = layout.width.__getValue()
        const moved = gesture.dx
        const gestureVelocity = gesture.vx
        const defaultVelocity = distance / ANIMATION_DURATION
        const velocity = Math.max(Math.abs(gestureVelocity), defaultVelocity)
        const resetDuration = moved / velocity
        const goBackDuration = (distance - moved) / velocity

        // To asyncronously get the current animated value, we need to run stopAnimation:
        position.stopAnimation((value) => {
          // If the speed of the gesture release is significant, use that as the indication
          // of intent
          if (gestureVelocity < -0.5) {
            this._reset(immediateIndex, resetDuration, position)
            return
          }

          if (gestureVelocity > 0.5) {
            this._goBack(immediateIndex, goBackDuration, position)
            return
          }

          // Then filter based on the distance the screen was moved. Over a third of the way swiped,
          // and the back will happen.
          if (value <= index - POSITION_THRESHOLD) {
            this._goBack(immediateIndex, goBackDuration, position)
          } else {
            this._reset(immediateIndex, resetDuration, position)
          }
        })
      }
    })
}