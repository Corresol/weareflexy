import { StyleSheet } from 'react-native'

import {
  em
} from './responsive'

const PADDING = em(2.25)

const FRAME = {
  position: 'absolute',
  display: 'flex',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const VERTICAL_GRID = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  flexGrow: 1,
  flexShrink: 1,
  alignSelf: 'stretch'
}

const HORIZONTAL_GRID = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  flexGrow: 1,
  flexShrink: 1,
  alignSelf: 'stretch'
}

const CENTERED_CELL = {
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: PADDING,
  paddingRight: PADDING
}

const START_CELL = {
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: PADDING,
  paddingRight: PADDING
}

const SPREAD_CELL = {
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: PADDING,
  paddingRight: PADDING
}

const LEFT_CELL = {
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingLeft: PADDING,
  paddingRight: PADDING
}

const SPREAD = {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch'
}

const styles = StyleSheet.create({
  verticalGrid: VERTICAL_GRID,
  horizontalGrid: HORIZONTAL_GRID,
  centeredCell: CENTERED_CELL,
  startCell: START_CELL,
  spreadCell: SPREAD_CELL,
  leftCell: LEFT_CELL,
  frame: FRAME,
  spread: SPREAD
})

export default styles
