import { StyleSheet } from 'react-native'

import {
  em
} from './responsive'

import colors from './colors'

const NORMAL_FONT = em(0.9)

const MIDDLE_FONT = em(1.125)

const LARGE_FONT = em(1.25)

const NORMAL_TEXT = {
  color: colors.complete,
  fontFamily: 'Asap-Regular',
  fontSize: NORMAL_FONT,
  backgroundColor: 'transparent'
}

const BOLD_TEXT = Object.assign({}, NORMAL_TEXT, {
  fontFamily: 'Asap-Bold',
  lineHeight: NORMAL_FONT * 1.5
})

const SUBTITLE = Object.assign({}, BOLD_TEXT, {
  fontSize: MIDDLE_FONT,
  lineHeight: MIDDLE_FONT * 1.5
})

const TITLE = Object.assign({}, BOLD_TEXT, {
  fontSize: LARGE_FONT,
  lineHeight: LARGE_FONT * 1.5
})

const SMALL_LABEL = Object.assign({}, NORMAL_TEXT, {
  fontFamily: 'Asap-Bold'
})

const LINK = Object.assign({}, BOLD_TEXT, {
  textAlign: 'left'
})

const COMPLETE = Object.assign({}, BOLD_TEXT, {
  color: colors.ui_1
})

const styles = StyleSheet.create({
  normal: NORMAL_TEXT,
  bold: BOLD_TEXT,
  title: TITLE,
  subtitle: SUBTITLE,
  link: LINK,
  complete: COMPLETE,
  smallLabel: SMALL_LABEL
})

export default styles
