import Appointment from '../../views/booking/Appointment'
import TimeSlot from '../../views/booking/TimeSlot'
import ChooseID from '../../views/booking/ChooseID'
import WhyDocument from '../../views/booking/WhyDocument'
import UploadID from '../../views/booking/UploadID'
import ChooseCall from '../../views/booking/ChooseCall'
import AppointmentConfirm from '../../views/booking/AppointmentConfirm'

const routeConfig = {
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
  }
}

const appointmentBooked = [
  'Appointment',
  'TimeSlot',
  'ChooseID'
]

const idSent = [
  'Appointment',
  'TimeSlot',
  'ChooseID',
  'UploadID',
  'ChooseCall'
]

const appointmentReady = [
  'AppointmentConfirm'
]

const initialRoutes = {
  appointmentBooked,
  idSent,
  appointmentReady
}

export {
  initialRoutes,
  routeConfig
}
