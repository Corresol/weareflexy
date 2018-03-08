import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  jobResponse
} from '../../actions'

import {
  StyleSheet
} from 'react-native'

import ModalButtonGreen from '../../components/ModalButtonGreen'
import TextBox from '../../components/TextBox'

import MultiSelect from '../../components/MultiSelect'

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
    paddingBottom: 0
  },
  message: {
    flexGrow: 0,
    flexShrink: 0,
    paddingBottom: em(1)
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'rgb(246,246,246)'
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
    flexGrow: 0,
    height: em(6.75),
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(220,220,220)',
    backgroundColor: 'rgb(246,246,246)'
  }
})

class Decline extends Component {
  static viewMenuTitle = 'Not for me'
  static showHeader = true
  static headerType = 'titleNoLogo'

  constructor (props) {
    super(props)

    this.state = {
      ghosted: true,
      profileOpen: false,
      notificationsOpen: false,
      viewed: false
    }
  }

  _optionChosen = () => {
    this.setState({
      ghosted: false
    })
  }

  _finish = () => {
    this.props.jobResponse('uninterested', this.props.job)
    .then(response => {
      console.log('Decline response', response)

      this.props.drawer()
    })
  }

  render () {
    return (
      <Vertical localStyle={styles.layout}>
        <CellCentered localStyle={styles.message}>
          <TextBox>Can you give us your reasons why this job is not suitable for you? Your feedback will allow us to improve our services and offer you better jobs</TextBox>
        </CellCentered>
        <CellCentered localStyle={[styles.container]}>
          <MultiSelect action={this._optionChosen} />
        </CellCentered>
        <CellCentered localStyle={[styles.holder]}>
          <ModalButtonGreen
            ghosted={this.state.ghosted}
            localStyle={styles.button}
            label={'Submit feedback'}
            action={this._finish}
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

export default connect(mapStateToProps, mapDispatchToProps)(Decline)

// export default Decline
