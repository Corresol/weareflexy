const awaitingPhoneVerified = [
  'Login',
  'Register'
]

const phoneVerified = [
  'Login',
  'Register',
  'Confirmation'
]

const appointmentPending = [
  'Login',
  'Appointment'
]

const appointmentBooked = [
  'Login',
  'Appointment',
  'TimeSlot',
  'ChooseID'
]

const idSent = [
  'Login',
  'Appointment',
  'TimeSlot',
  'ChooseID',
  'UploadID',
  'ChooseCall'
]

const appointmentReady = [
  'Login',
  'AppointmentConfirm'
]

const loggedIn = [
  'Login',
  'Home'
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

const getInitialRoute = (stage) => {
  const reset = initialRoutes[stage] ? initialRoutes[stage] : []

  return reset
}

export default getInitialRoute
