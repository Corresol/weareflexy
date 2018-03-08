import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  StyleSheet
} from 'react-native'

import {
  em,
  colors
} from '../styles'

import RoundBlob from '../components/RoundBlob'
import TextBox from '../components/TextBox'
import { ResponsiveImage } from '../components/Icons'

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inflexible: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  flexible: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: em(1)
  },
  title: {
    color: colors.text_alternate
  },
  blob: {
    backgroundColor: 'rgb(255,255,255)',
    padding: em(0.75),
    marginBottom: em(1.3)
  }
})

class CategorySkills extends Component {
  render () {
    const skills = this.props.job.skills.map((skill, index) => {
      return (
        <Skill key={index} label={skill} />
      )
    })

    const category = this.props.categories[this.props.job.categoryId].name

    return (
      <RoundBlob localStyle={styles.blob}>
        <View style={styles.layout}>
          <View style={styles.container}>
            <TextBox localStyle={styles.title}>{category}</TextBox>
          </View>
          <View style={styles.container}>
            {skills}
          </View>
        </View>
      </RoundBlob>
    )
  }
}

const badgeStyles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    height: em(1.5),
    paddingLeft: em(0.25),
    paddingRight: em(0.5),
    marginRight: em(0.5),
    marginTop: em(0.5),
    backgroundColor: colors.ui_2,
    borderTopLeftRadius: em(0.75),
    borderTopRightRadius: em(0.25),
    borderBottomLeftRadius: em(0.75),
    borderBottomRightRadius: em(0.25)
  },
  inflexible: {
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  flexible: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: em(0.5)
  },
  text: {
    color: colors.text_alternate
  }
})

const Skill = (props) => {
  return (
    <View style={badgeStyles.layout}>
      <View style={badgeStyles.inflexible}>
        <Icon />
      </View>
      <View style={badgeStyles.flexible}>
        <TextBox>{props.label}</TextBox>
      </View>
    </View>
  )
}

const iconStyles = StyleSheet.create({
  layout: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: em(1),
    height: em(1),
    borderRadius: em(0.5),
    backgroundColor: 'rgb(255,255,255)'
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    width: 12,
    height: 10
  }
})

const Icon = (props) => {
  return (
    <View style={iconStyles.layout}>
      <View style={iconStyles.icon}>
        <ResponsiveImage icon={'iconCompleteOrange'} />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId],
    categories: state.jobCategories.byId
  }
}

export default connect(mapStateToProps)(CategorySkills)
