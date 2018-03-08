import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import {
  colors,
  em,
  text
} from '../styles'

import TextBox from '../components/TextBox'
import Rating from '../components/Rating'

import {
  ResponsiveImage
} from '../components/Icons'

const stylesWhite = StyleSheet.create({
  action: {
    alignSelf: 'stretch'
  },
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch',
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(2),
    paddingRight: em(1)
  },
  flexible: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginRight: em(1)
  },
  inflexible: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: 10
  },
  text: {
    color: 'rgb(255,255,255)'
  },
  icon: {
    flexGrow: 1,
    width: em(1.25)
  }
})

const stylesColor = StyleSheet.create({
  action: {
    alignSelf: 'stretch'
  },
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch',
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(2),
    paddingRight: em(1),
    backgroundColor: 'rgb(255,255,255)'
  },
  flexible: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginRight: em(1)
  },
  inflexible: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: 10
  },
  text: {
    color: colors.text_alternate
  },
  icon: {
    flexGrow: 1,
    width: em(1.25)
  }
})

class JobOverview extends Component {
  _onAction = () => {
    if (!this.props.noAction) {
      this.props.action()
    }
  }

  render () {
    const starColor = {
      white: {
        active: 'rgba(255,255,255,1)',
        inactive: 'rgba(255,255,255,0.3)'
      },
      color: {
        active: colors.ui_2,
        inactive: 'rgba(0,0,0,0.5)'
      }
    }

    const styles = this.props.mode === 'color' ? stylesColor : stylesWhite
    const stars = this.props.mode === 'color' ? starColor.color : starColor.white
    const icon = this.props.mode === 'color' ? 'iconForwardBlack' : 'iconForwardWhite'

    const {
      title,
      employer
    } = this.props.job

    const rating = employer.rating
    const company = employer.companyName

    // const title = this.props.title
    // const rating = this.props.employerRating
    // const company = this.props.employerName

    return (
      <TouchableHighlight
        style={styles.action}
        onPress={this._onAction}
        underlayColor={'rgba(0,0,0,0)'}
      >
        <View style={[styles.layout, this.props.localStyle]}>
          <View style={styles.flexible}>
            <TextBox localStyle={[text.subtitle, styles.text]}>{company}</TextBox>
            <Rating rating={rating} active={stars.active} inactive={stars.inactive} />
            <View >
              <TextBox localStyle={styles.text}>{title}</TextBox>
            </View>
          </View>
          <View style={styles.inflexible}>
            {!this.props.noAction && <ResponsiveImage icon={icon} />}
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId]
  }
}

export default connect(mapStateToProps)(JobOverview)
