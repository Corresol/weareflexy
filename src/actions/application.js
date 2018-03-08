import storage from '../utils/storage'
import {
  createAccount,
  confirmPhone,
  createUnverifiedPhone
} from './registration'

import {
  login
} from './authentication'

import {
  getWorkerAccount
} from './account'

import {
  signUpload
} from './storage'

import {
  createRtwDocument
} from './rtwDocuments'

import {
  bookAppointment,
  getBookedAppointment
} from './appointments'

import {
  setPersonalStatement
} from './profile'

import {
  getJobCategories,
  getJob,
  getConflictingSchedules,
  replyInterested,
  replyNotInterested,
  bookSchedules
} from './jobs'

import RNFetchBlob from 'react-native-fetch-blob'

import config from '../config'

const createPhone = (data) => {
  return (dispatch, getState) => {
    const phone = data.phone

    console.log('Attempting to get phone SMS', phone)

    return dispatch(createUnverifiedPhone(phone))
      .then(result => {
        return dispatch(setAppCache(data, 'register'))
          .then(() => {
            return dispatch(registerStage('awaitingPhoneVerified'))
          })
      })
      .then(result => {
        return result
      })
  }
}

const verifyPhone = (phone, confirmCode) => {
  return (dispatch, getState) => {
    const params = {
      phone: phone,
      confirmCode: confirmCode
    }

    return dispatch(confirmPhone(params))
      .then(result => {
        let data = null

        if (result.type === 'CONFIRM_PHONE_DONE') data = result.payload.result

        return data
      })
      .then(data => {
        // return dispatch(registerStage('phoneVerified'))

        if (data) {
          const token = data.verificationToken

          return dispatch(setAppCache(token, 'verificationToken'))
            .then(() => {
              return dispatch(registerStage('phoneVerified'))
            })
        }

        return data
      })
  }
}

const newAccount = (data) => {
  return (dispatch, getState) => {
    let register = getState().appCache.register
    let verificationToken = getState().appCache.verificationToken

    const params = {
      firstName: register.firstName,
      lastName: register.lastName,
      email: register.email,
      password: register.password,
      phone: register.phone,
      phoneVerificationToken: verificationToken
    }

    return dispatch(createAccount(params))
      .then(result => {
        let data = null

        console.log('Result from account', result)

        if (result.type === 'CREATE_ACCOUNT_DONE') data = result.payload.result

        return data
      })
      .then(data => {
        if (data) {
          return dispatch(storeWorker('appointmentPending'))
        }

        return data
      })
  }
}

const setAppointment = (appointment) => {
  return (dispatch, getState) => {
    return dispatch(setAppCache(appointment, 'appointment'))
    .then(() => {
      return dispatch(registerStage('appointmentBooked'))
    })
  }
}

const setIdType = (type) => {
  return (dispatch, getState) => {
    return dispatch(setAppCache(type, 'attachmentType'))
  }
}

const doLogin = (email, password) => {
  return (dispatch, getState) => {
    return dispatch(login(email, password))
      .then(result => {
        let data = null

        let state = getState()

        console.log('Result from account', result, state)

        if (result.type === 'AUTH_LOGIN_DONE') data = result.payload.result

        return data
      })
      .then(data => {
        if (data) {
          return dispatch(getBookedAppointment())
            .then(result => {
              console.log('Result from appointment', result)

              return dispatch(getJobCategories())
            })
            .then(result => {
              return dispatch(storeWorker('loggedIn'))
            })
        }

        return data
      })
  }
}

const storeWorker = (stage) => {
  return (dispatch, getState) => {
    const state = getState()

    const {
      workerAccount,
      authentication
    } = state

    return updatePersistent('workerAccount', workerAccount)
      .then(() => {
        return updatePersistent('authentication', authentication)
      })
      .then(result => {
        if (stage) {
          return dispatch(registerStage(stage))
        }

        return result
      })
  }
}

const putFile = (file, endpoint, headers = {}) => {
  const stripped = file.replace('file://', '')

  const baseHeaders = {
    'Content-Type': 'image/jpeg'
  }

  const finalHeader = Object.assign({}, baseHeaders, headers)

  return RNFetchBlob.fetch(
    'PUT',
    endpoint,
    finalHeader,
    RNFetchBlob.wrap(stripped)
  )
  .then(result => {
    console.log('Result from put', result)
    return file
  })
  .catch(error => {
    console.log('Error in put', error)

    return null
  })
}

const uploadFiles = (files, type) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'APP_WAITING'
    })

    return Promise.all(files.map(file => {
      return dispatch(signUpload('image/jpeg'))
    }))
    .then(uploads => {
      const success = uploads.every(upload => {
        return upload.type === 'SIGN_UPLOAD_DONE'
      })

      if (success) {
        return Promise.all(uploads.map((signed, index) => {
          const {
            uploadUrl,
            fileId
          } = signed.payload.result

          // REALLY BALSY HACK MAKE SURE TO SET UP MECHANISM FOR TYPE KEYWORD WHEN BORJA DESIGNS IT
          const imageType = 'front'

          const endpoint = Array.isArray(uploadUrl) ? uploadUrl[0] : uploadUrl

          return putFile(files[index], endpoint)
            .then(result => {
              return {
                type: imageType,
                fileId: fileId
              }
            })
        })
        )
      }

      return null
    })
    .then(data => {
      console.log('result from promise', data)

      const createDocument = {
        type: type,
        photos: data
      }

      return createDocument
    })
    .then(data => {
      return dispatch(createRtwDocument(data))
    })
    .then(result => {
      let data = null

      console.log('Documents created', result)

      if (result.type === 'CREATE_RTW_DOC_DONE') {
        data = result.payload
      }

      dispatch({
        type: 'APP_READY'
      })

      return data
    })
    .then(result => {
      return dispatch(setAppCache(files, 'attachments'))
        .then(() => {
          return dispatch(registerStage('idSent'))
        })
    })
    .then(() => {
      const state = getState().rtwDocuments

      return updatePersistent('rtwDocuments', state)
    })
  }
}

const finaliseAppointment = (platform, platformIdentity) => {
  return (dispatch, getState) => {
    const appointment = getState().appCache.appointment

    const final = {
      appointmentId: appointment.id,
      bookAppointment: {
        platform: platform,
        platformIdentity: platformIdentity,
        version: appointment.version
      }
    }

    console.log('Final step', final)

    return dispatch(bookAppointment(final.appointmentId, final.bookAppointment))
      .then(result => {
        let data = null

        console.log('Result for booking', result)

        if (result.type === 'BOOK_APPT_DONE') data = result.payload.result

        return data
      })
      .then(data => {
        if (data) {
          const appointments = getState().appointments
          return updatePersistent('appointments', appointments)
          .then(() => {
            return dispatch(registerStage('appointmentReady'))
          })
        }

        return data
      })
  }
}

const setAccountReady = () => {
  return (dispatch, getState) => {
    return dispatch(setAppCache('basic', 'profileLevel'))
    .then(() => {
      return dispatch(registerStage('loggedIn'))
    })
  }
}

const uploadProfileImage = (file) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'APP_WAITING'
    })

    const endpoint = config.apiBase + '/profile/photo'

    const auth = getState().authentication

    const header = {
      'Authorization': `Bearer ${auth.accessToken}`
    }

    // Big Fix needed when the server returns the tokens as well
    return putFile(file, endpoint, header)
      .then(result => {
        if (result) {
          return dispatch(getWorkerAccount())
            .then(result => {
              let data = null

              if (result.type === 'AUTH_GET_CURRENT_DONE') data = result.payload.result

              return data
            })
        }

        return null
      })
      .then(result => {
        if (result) {
          dispatch({
            type: 'APP_READY'
          })

          return dispatch(storeWorker())
        }

        return result
      })
  }
}

const setStatement = (statement) => {
  return (dispatch, getState) => {
    return dispatch(setPersonalStatement(statement))
      .then(result => {
        if (result) {
          console.log('statement stored', result)
          return dispatch(storeWorker())
        }

        return null
      })
  }
}

const registerStage = (stage) => {
  return (dispatch, getState) => {
    return dispatch(setAppCache(stage, 'stage'))
      .then(result => {
        return {
          result,
          stage: stage
        }
      })
  }
}

const prefetchJob = (jobId) => {
  return (dispatch, getState) => {
    return dispatch(getJob(jobId))
      .then(result => {
        return result
      })
      .then(result => {
        return dispatch({
          type: 'SET_CACHE',
          key: 'jobId',
          data: jobId
        })
      })
  }
}

const updatePersistent = (key, data, section) => {
  if (section) {
    return storage.get(section)
      .then(value => {
        let update = {}

        update[key] = data

        const base = value !== null ? value : {}

        const appCache = Object.assign(base, update)

        return storage.save('appCache', appCache)
      })
  } else {
    return storage.save(key, data)
  }
}

const setAppCache = (data, key) => {
  return (dispatch, getState) => {
    return updatePersistent(key, data, 'appCache')
      .then(value => {
        console.log('Saved data', key, value)

        dispatch({
          type: 'SET_CACHE',
          key: key,
          data: data
        })
      })
  }
}

const checkScheduleConflict = (schedules) => {
  return (dispatch, getState) => {
    const jobId = getState().appCache.jobId

    return dispatch(getConflictingSchedules(jobId, schedules))
  }
}

const jobResponse = (type, jobId) => {
  return (dispatch, getState) => {
    if (type === 'interested') return dispatch(replyInterested(jobId))

    if (type === 'uninterested') return dispatch(replyNotInterested(jobId))
  }
}

const sendSchedules = (jobId, scheduleIds, jobVersion) => {
  return (dispatch, getState) => {
    return dispatch(bookSchedules(jobId, { scheduleIds, jobVersion }))
      .then(response => {
        return response
      })
  }
}

const storeShifts = (shifts) => {
  return (dispatch, getState) => {
    console.log('Got Shifts', shifts)

    dispatch({
      type: 'SET_CACHE',
      key: 'shifts',
      data: shifts
    })
  }
}

const emptyCache = () => {
  return (dispatch, getState) => {
    return storage.empty()
      .then(value => {
        console.log('Emptied cache', value)

        dispatch({
          type: 'EMPTY_CACHE'
        })
      })
  }
}

const getCache = (key) => {
  return (dispatch, getState) => {
    const state = getState()

    return state.appCache[key]
  }
}

const dumpState = () => {
  return (dispatch, getState) => {
    const state = getState()

    return state
  }
}

export {
  doLogin,
  newAccount,
  setAppointment,
  setIdType,
  uploadFiles,
  finaliseAppointment,
  emptyCache,
  getCache,
  createPhone,
  verifyPhone,
  registerStage,
  setAccountReady,
  dumpState,
  uploadProfileImage,
  setStatement,
  prefetchJob,
  storeShifts,
  checkScheduleConflict,
  jobResponse,
  sendSchedules
}
