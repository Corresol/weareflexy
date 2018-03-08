import Landing from '../../views/Landing'
import Login from '../../views/Login'
import Home from '../../views/Home'
import Register from '../../views/Register'
import Confirmation from '../../views/Confirmation'
import Appointment from '../../views/Appointment'
import TimeSlot from '../../views/TimeSlot'
import ChooseID from '../../views/ChooseID'
import WhyDocument from '../../views/WhyDocument'
import UploadID from '../../views/UploadID'
import ChooseCall from '../../views/ChooseCall'
import AppointmentConfirm from '../../views/AppointmentConfirm'

import {
  StackRouter
} from 'react-navigation'

const routeConfig = {
  Landing: {
    screen: Landing
  },
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Confirmation: {
    screen: Confirmation
  },
  Appointment: {
    screen: Appointment
  },
  TimeSlot: {
    screen: TimeSlot
  },
  ChooseID: {
    screen: ChooseID
  },
  WhyDocument: {
    screen: WhyDocument
  },
  UploadID: {
    screen: UploadID
  },
  ChooseCall: {
    screen: ChooseCall
  },
  AppointmentConfirm: {
    screen: AppointmentConfirm
  },
  Home: {
    screen: Home
  }
}

const router = StackRouter(routeConfig)

export {
  router,
  routeConfig
}
