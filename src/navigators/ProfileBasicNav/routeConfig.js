import Notification from '../../views/profile_basic/Notification'
import Info from '../../views/profile_basic/Info'
import Upload from '../../views/profile_basic/Upload'
import Statement from '../../views/profile_basic/Statement'
import Confirmation from '../../views/profile_basic/Confirmation'
import FAQ from '../../views/general/FAQ'

const routeConfig = {
  Notification: {
    screen: Notification
  },
  FAQ: {
    screen: FAQ
  },
  Info: {
    screen: Info
  },
  Upload: {
    screen: Upload
  },
  Statement: {
    screen: Statement
  },
  Confirmation: {
    screen: Confirmation
  }
}

const notification = {
  Notification: {
    screen: Notification
  }
}

const base = {
  Info: {
    screen: Info
  },
  Upload: {
    screen: Upload
  },
  Statement: {
    screen: Statement
  },
  Confirmation: {
    screen: Confirmation
  },
  FAQ: {
    screen: FAQ
  }
}

const viewed = {
  Upload: {
    screen: Upload
  },
  Statement: {
    screen: Statement
  },
  Confirmation: {
    screen: Confirmation
  },
  FAQ: {
    screen: FAQ
  }
}

const statement = {
  Statement: {
    screen: Statement
  },
  Confirmation: {
    screen: Confirmation
  },
  FAQ: {
    screen: FAQ
  }
}

const complete = {
  Confirmation: {
    screen: Confirmation
  },
  FAQ: {
    screen: FAQ
  }
}

const routeConfigSet = {
  notification,
  base,
  viewed,
  statement,
  complete
}

const photoComplete = [
  'Upload',
  'Statement'
]

const statementComplete = [
  'Upload',
  'Statement',
  'Confirmation'
]

const initialRoutes = {
  photoComplete,
  statementComplete
}

export {
  initialRoutes,
  routeConfig,
  routeConfigSet
}
