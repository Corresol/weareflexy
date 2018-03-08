import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  jobResponse
} from '../../actions'

import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native'

import ModalButtonGrey from '../../components/ModalButtonGrey'
import ModalButtonOrange from '../../components/ModalButtonOrange'

import JobOverview from '../../widgets/JobOverview'
import PayRate from '../../widgets/PayRate'
import Distance from '../../widgets/Distance'
import Perks from '../../widgets/Perks'
import CategorySkills from '../../widgets/CategorySkills'

import {
  Vertical
} from '../../containers/Grid'

import {
  CellCentered
} from '../../containers/Cell'

import {
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
  innerContent: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'stretch',
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(1.25),
    paddingRight: em(1.25)
  },
  holder: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexGrow: 0,
    height: em(6.75),
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(220,220,220)'
  },
  button: {
    flexGrow: 1,
    alignSelf: 'center',
    margin: em(0.25)
  }
})

class Info extends Component {
  static viewMenuTitle = 'New job alert'
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

  _showJob = () => {
    const {
      navigate
    } = this.props.navigation

    navigate('Schedule')
  }

  _decline = () => {
    const {
      navigate
    } = this.props.navigation

    this.props.jobResponse('uninterested', this.props.job)
      .then(response => {
        console.log('Decline response', response)

        navigate('Decline')
      })
  }

  _accept = () => {
    const {
      navigate
    } = this.props.navigation

    this.props.jobResponse('interested', this.props.job)
    .then(response => {
      console.log('Accept response', response)

      navigate('Interview')
    })
  }

  _showLocation = () => {
    const {
      navigate
    } = this.props.navigation

    navigate('Location')
  }

  _finish = () => {
    this.props.drawer()
  }

  render () {
    return (
      <Vertical localStyle={styles.layout}>
        <CellCentered localStyle={[styles.container]}>
          <JobOverview
            action={this._showJob}
            mode={'color'}
          />
          <ScrollView style={styles.content}>
            <View style={styles.innerContent}>
              <PayRate />
              <Distance action={this._showLocation} />
              <Perks />
              <CategorySkills />
            </View>
          </ScrollView>
        </CellCentered>
        <CellCentered localStyle={[styles.holder]}>
          <ModalButtonGrey
            localStyle={styles.button}
            label={'Not for me'}
            action={this._decline}
          />
          <ModalButtonOrange
            localStyle={styles.button}
            label={"Yes. I'm interested"}
            action={this._accept}
          />
        </CellCentered>
      </Vertical>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.byId[state.appCache.jobId]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    jobResponse: (type, jobId) => {
      return dispatch(jobResponse(type, jobId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)

// export default Info

