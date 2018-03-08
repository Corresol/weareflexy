import Info from '../../views/job_alert/Info'
import Decline from '../../views/job_alert/Decline'
import Interview from '../../views/job_alert/Interview'
import Schedule from '../../views/job_alert/Schedule'
import Location from '../../views/job_alert/Location'
import Booked from '../../views/job_alert/Booked'
import FAQ from '../../views/general/FAQ'

const routeConfig = {
  Info: {
    screen: Info
  },
  Location: {
    screen: Location
  },
  Interview: {
    screen: Interview
  },
  Schedule: {
    screen: Schedule
  },
  Decline: {
    screen: Decline
  },
  Booked: {
    screen: Booked
  },
  FAQ: {
    screen: FAQ
  }
}

const base = {
  Info: {
    screen: Info
  },
  Location: {
    screen: Location
  },
  Interview: {
    screen: Interview
  },
  Schedule: {
    screen: Schedule
  },
  Decline: {
    screen: Decline
  },
  Booked: {
    screen: Booked
  },
  FAQ: {
    screen: FAQ
  }
}

const routeConfigSet = {
  base
}

const initialRoutes = {}

export {
  initialRoutes,
  routeConfig,
  routeConfigSet
}
