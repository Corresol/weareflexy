import React, { Component } from 'react'
// import { connect } from 'react-redux'

import {
  ScrollView,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import TextBox from '../../components/TextBox'
import { ResponsiveImage } from '../../components/Icons'
import ModalButtonGreen from '../../components/ModalButtonGreen'

import {
  Vertical
} from '../../containers/Grid'

import {
  CellCentered
} from '../../containers/Cell'

import {
  text,
  colors,
  em
} from '../../styles'

const styles = StyleSheet.create({
  layout: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'rgb(246,246,246)'
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch'
  },
  holder: {
    flexGrow: 0,
    height: em(6.75),
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(220,220,220)'
  }
})

class FAQ extends Component {
  static viewMenuTitle = 'Booking shifts F.A.Qs'
  static showHeader = true
  static headerType = 'titleNoLogo'

  constructor (props) {
    super(props)

    this.state = {
      profileOpen: false,
      notificationsOpen: false,
      viewed: false
    }
  }

  _finish = () => {
    const {
      goBack
    } = this.props.navigation

    goBack()
  }

  render () {
    let FAQS = []

    let i = 0

    while (i < 10) {
      FAQS.push(
        <FAQBlock
          key={i}
          title={'Where do I need to turn up for my shift?'}
          message={'You will be reminded before each of your shift. You can access your shifts in your shifts timeline from your menu and landing page.'}
        />
      )

      i++
    }

    return (
      <Vertical localStyle={styles.layout}>
        <CellCentered localStyle={[styles.container]}>
          <ScrollView style={styles.content}>
            <View style={styles.content}>
              {FAQS}
            </View>
          </ScrollView>
        </CellCentered>
        <CellCentered localStyle={[styles.holder]}>
          <ModalButtonGreen
            label={'Ok. Thank you'}
            action={this._finish}
          />
        </CellCentered>
      </Vertical>
    )
  }
}

const faqBlockStyles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(255,255,255)',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(220,220,220)',
    marginBottom: em(1)
  },
  row: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: em(1.25),
    paddingBottom: em(1.25),
    paddingLeft: em(1.25),
    paddingRight: em(1.25)
  },
  rowTop: {
    paddingRight: 0
  },
  message: {
    paddingTop: 0,
    paddingBottom: em(1.25)
  },
  title: {
    lineHeight: em(1.5)
  },
  contentText: {
    lineHeight: em(1.125)
  },
  text: {
    color: colors.text_alternate
  },
  wrapper: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-start',
    marginLeft: em(1),
    marginRight: em(1),
    width: 18,
    height: 20
  }
})

class FAQBlock extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  _show = () => {
    const open = this.state.open

    this.setState({
      open: !open
    })
  }

  render () {
    let content = null
    let Icon = IconClosed

    if (this.state.open) {
      Icon = IconOpen

      content = (
        <View style={[faqBlockStyles.row, faqBlockStyles.message]}>
          <View style={faqBlockStyles.wrapper}>
            <TextBox localStyle={[faqBlockStyles.text, faqBlockStyles.contentText]}>{this.props.message}</TextBox>
          </View>
        </View>
      )
    }

    return (
      <TouchableHighlight
        onPress={this._show}
        underlayColor={'rgba(0,0,0,0)'}
      >
        <View style={faqBlockStyles.layout}>
          <View style={[faqBlockStyles.row, faqBlockStyles.rowTop]}>
            <View style={faqBlockStyles.wrapper}>
              <TextBox localStyle={[text.subtitle, faqBlockStyles.text, faqBlockStyles.title]}>{this.props.title}</TextBox>
            </View>
            <Icon />
          </View>
          {content}
        </View>
      </TouchableHighlight>
    )
  }
}

const IconOpen = (props) => {
  return (
    <View style={faqBlockStyles.icon}>
      <ResponsiveImage icon={'iconUpOrange'} />
    </View>
  )
}

const IconClosed = (props) => {
  return (
    <View style={faqBlockStyles.icon}>
      <ResponsiveImage icon={'iconDownOrange'} />
    </View>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     faq: state.faq
//   }
// }

// export default connect(mapStateToProps)(FAQ)

export default FAQ
