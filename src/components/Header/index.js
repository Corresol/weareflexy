import React, { Component } from 'react'

import WithTitle from './WithTitle'
import NoTitle from './NoTitle'
import Landing from './Landing'
import Profile from './Profile'
import TitleNoLogo from './TitleNoLogo'

const headerType = {
  title: WithTitle,
  noTitle: NoTitle,
  landing: Landing,
  profile: Profile,
  titleNoLogo: TitleNoLogo
}

export default class Header extends Component {
  render () {
    const Component = headerType[this.props.type]

    return (
      <Component {...this.props} />
    )
  }
}
