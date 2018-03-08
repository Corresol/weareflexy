const velocityCalc = (duration, moved, velocity, maxDistance) => {
  const defaultVelocity = maxDistance / duration

  const actualVelocity = Math.max(Math.abs(velocity), defaultVelocity)

  return moved / actualVelocity
}

export default velocityCalc
