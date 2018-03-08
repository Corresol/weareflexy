import infoNav from './InfoNav'
import bookingNav from './BookingNav'

const componentForStage = {
  awaitingPhoneVerified: infoNav,
  phoneVerified: infoNav,
  appointmentPending: bookingNav,
  appointmentBooked: bookingNav,
  idSent: bookingNav,
  appointmentReady: bookingNav,
  loggedIn: bookingNav
}

const flow = (stage) => {
  let nav = infoNav

  console.log('Sub navigator stage', stage)

  // if (stage === 'appointmentPending') nav = bookingNav

  nav = componentForStage[stage]

  return nav(stage)
}

export default flow
