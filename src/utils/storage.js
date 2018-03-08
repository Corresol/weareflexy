import {
  AsyncStorage
} from 'react-native'

var store = {
  get: (key) => {
    if (!Array.isArray(key)) {
      return AsyncStorage.getItem(key).then(value => {
        return JSON.parse(value)
      })
    } else {
      return AsyncStorage.multiGet(key).then(values => {
        return values.map(value => {
          return JSON.parse(value[1])
        })
      })
    }
  },

  save: (key, value) => {
    if (!Array.isArray(key)) {
      return AsyncStorage.setItem(key, JSON.stringify(value))
        .then(() => {
          return value
        })
    } else {
      var pairs = key.map(function (pair) {
        return [pair[0], JSON.stringify(pair[1])]
      })
      return AsyncStorage.multiSet(pairs)
    }
  },

  update: (key, value) => {
    return store.get(key).then(item => {
      return AsyncStorage.setItem(key, JSON.stringify(value))
    })
  },

  delete: (key) => {
    return AsyncStorage.removeItem(key)
  },

  keys: () => {
    return AsyncStorage.getAllKeys()
  },

  all: () => {
    return store.keys()
      .then(keys => {
        if (keys.length > 0) {
          return Promise.all(keys.map(key => {
            return store.get(key)
          }))
          .then(result => {
            let data = {}

            keys.forEach((key, index) => {
              data[key] = result[index]
            })

            return data
          })
        } else {
          return null
        }
      })
      .then(result => {
        return result
      })
  },

  empty: () => {
    return AsyncStorage.clear()
  }
}

export default store
