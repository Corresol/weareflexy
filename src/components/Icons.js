import React from 'react'
import {
  Image,
  StyleSheet
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

const logoVertical = require('../../assets/png/logo_vertical/logo.png')
const iconEdit = require('../../assets/png/icon_edit/icon.png')
const iconMandatory = require('../../assets/png/icon_mandatory/icon.png')
const iconClose = require('../../assets/png/icon_close/icon.png')
const iconMenu = require('../../assets/png/icon_menu/icon.png')
const iconComplete = require('../../assets/png/icon_complete/icon.png')
const iconCompleteWhite = require('../../assets/png/icon_complete_white/icon.png')
const iconCompleteOrange = require('../../assets/png/icon_complete_orange/icon.png')
const iconBack = require('../../assets/png/icon_back/icon.png')
const iconCalendarGreen = require('../../assets/png/icon_calendar_green/icon.png')
const iconCalendarWhite = require('../../assets/png/icon_calendar_white/icon.png')
const iconJobSmall = require('../../assets/png/icon_job_small/icon.png')
const iconJobSmallGreen = require('../../assets/png/icon_job_small_green/icon.png')
const iconProfileSmall = require('../../assets/png/icon_profile_small/icon.png')
const iconProfileSmallGreen = require('../../assets/png/icon_profile_small_green/icon.png')
const iconProfilePrompt = require('../../assets/png/icon_profile_prompt/icon.png')
const iconForwardWhite = require('../../assets/png/icon_forward_white/icon.png')
const iconForwardBlack = require('../../assets/png/icon_forward_black/icon.png')
const iconNotification = require('../../assets/png/icon_notification/icon.png')
const iconUploadSmall = require('../../assets/png/icon_upload_small/icon.png')
const iconSearch = require('../../assets/png/icon_search/icon.png')
const iconPhone = require('../../assets/png/icon_phone/icon.png')
const iconEmail = require('../../assets/png/icon_email/icon.png')
const iconStar = require('../../assets/png/icon_star/icon.png')
const iconFAQ = require('../../assets/png/icon_faq/icon.png')
const iconFAQOrange = require('../../assets/png/icon_faq_orange/icon.png')
const iconUpOrange = require('../../assets/png/icon_up_orange/icon.png')
const iconDownOrange = require('../../assets/png/icon_down_orange/icon.png')
const iconHourly = require('../../assets/png/icon_hourly/icon.png')
const iconCommision = require('../../assets/png/icon_commision/icon.png')
const iconLunch = require('../../assets/png/icon_lunch/icon.png')
const iconHoursType = require('../../assets/png/icon_hours_type/icon.png')
const iconTravelExpenses = require('../../assets/png/icon_travel_expenses/icon.png')
const iconChat = require('../../assets/png/icon_chat/icon.png')

const iconList = {
  logoVertical,
  iconEdit,
  iconMandatory,
  iconClose,
  iconMenu,
  iconComplete,
  iconCompleteWhite,
  iconCompleteOrange,
  iconBack,
  iconCalendarGreen,
  iconCalendarWhite,
  iconJobSmall,
  iconJobSmallGreen,
  iconProfileSmall,
  iconProfileSmallGreen,
  iconProfilePrompt,
  iconForwardWhite,
  iconForwardBlack,
  iconNotification,
  iconUploadSmall,
  iconSearch,
  iconPhone,
  iconEmail,
  iconStar,
  iconFAQ,
  iconFAQOrange,
  iconUpOrange,
  iconDownOrange,
  iconHourly,
  iconCommision,
  iconLunch,
  iconHoursType,
  iconTravelExpenses,
  iconChat
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
})

export const ResponsiveImage = (props) => {
  let icon = null

  if (typeof props.icon === 'string') {
    icon = iconList[props.icon]
  } else {
    icon = props.icon
  }

  if (icon) {
    return (
      <Image
        source={icon}
        style={[styles.base, props.style]}
        resizeMode={'center'}
      />
    )
  } else {
    return null
  }
}

export const MapPin = (props) => {
  const height = props.width * 1.5

  return (
    <Svg
      width={props.width}
      height={height}
      viewBox={'0 0 50 70.59'}
      preserveAspectRatio={'xMinYMin meet'}
    >
      <Path
        fill={props.color}
        d={'M50,25c0,13.81-25,45.59-25,45.59S0,38.81,0,25a25,25,0,0,1,50,0Zm-16.18.49A8.82,8.82,0,1,0,25,34.31,8.82,8.82,0,0,0,33.82,25.49Z'}
      />
    </Svg>
  )
}
