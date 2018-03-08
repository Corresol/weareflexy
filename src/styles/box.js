import { StyleSheet } from 'react-native'

import {
  em
} from './responsive'

import colors from './colors'

const BUTTON = {
  flexGrow: 0,
  flexShrink: 1,
  flexDirection: 'column',
  flexWrap: 'nowrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  alignSelf: 'stretch',
  marginBottom: em(0.75),
  borderRadius: em(0.6)
}

const PADDING = {
  paddingTop: em(0.7),
  paddingBottom: em(0.76),
  paddingLeft: em(0.6),
  paddingRight: em(0.6)
}

const INACTIVE = {
  backgroundColor: colors.inactive
}

const ACTIVE = {
  backgroundColor: colors.active
}

const GHOSTED = {
  backgroundColor: colors.ghosted,
  borderColor: colors.ghosted
}

const CTA = {
  backgroundColor: colors.ui_2
}

const CONTRAST = {
  backgroundColor: colors.ui_1
}

const COMPLETE = {
  backgroundColor: colors.complete
}

const WARNING = {
  backgroundColor: colors.warning
}

const styles = StyleSheet.create({
  button: BUTTON,
  padding: PADDING,
  inactive: INACTIVE,
  active: ACTIVE,
  ghosted: GHOSTED,
  complete: COMPLETE,
  warning: WARNING,
  cta: CTA,
  contrast: CONTRAST
})

export default styles
