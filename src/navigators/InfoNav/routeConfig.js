import Register from '../../views/register/Register'
import Confirmation from '../../views/register/Confirmation'

const routeConfig = {
  Register: {
    screen: Register
  },
  Confirmation: {
    screen: Confirmation
  }
}

const phoneVerified = [
  'Register',
  'Confirmation'
]

const initialRoutes = {
  phoneVerified
}

export {
  initialRoutes,
  routeConfig
}
