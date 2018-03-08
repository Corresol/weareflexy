import {
  Dimensions
} from 'react-native'

const BASE_FONT = 16

const {height, width} = Dimensions.get('window')

const vw = (percentage) => {
  return Math.round(width * (percentage / 100))
}

const vh = (percentage) => {
  return Math.round(height * (percentage / 100))
}

const em = (factor) => {
  return BASE_FONT * factor
}

export {
  vw,
  vh,
  em
}
