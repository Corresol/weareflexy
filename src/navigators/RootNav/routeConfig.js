import Login from '../../views/landing/Login'
import Default from '../../views/landing/Default'
import InfoComplete from '../../views/landing/InfoComplete'
import Booked from '../../views/landing/Booked'
import Profile from '../../views/landing/Profile'

const routeConfig = {
  Default: {
    screen: Default
  },
  InfoComplete: {
    screen: InfoComplete
  },
  Booked: {
    screen: Booked
  },
  Profile: {
    screen: Profile
  },
  Login: {
    screen: Login
  }
}

const awaitingPhoneVerified = [
  'Default'
]

const phoneVerified = [
  'Default'
]

const appointmentPending = [
  'InfoComplete'
]

const appointmentBooked = [
  'InfoComplete'
]

const idSent = [
  'InfoComplete'
]

const appointmentReady = [
  'InfoComplete'
]

const loggedIn = [
  'Booked'
]

const initialRoutes = {
  awaitingPhoneVerified,
  phoneVerified,
  appointmentPending,
  appointmentBooked,
  idSent,
  appointmentReady,
  loggedIn
}

export {
  routeConfig,
  initialRoutes
}
