import { AxiosRequestConfig } from 'axios';

module.exports = {
  environment: 'base',  
  axiosDefaults: {
    validateStatus: (status) => status >= 200 && status < 300 || status === 400 || status === 401
  },
  googleApiKey: 'AIzaSyAPQYx_NCk_FsRTUQ2PoH7jlHXk_rbq54k',
  geolocation: {
    fallbackPosition: {
      coords: {
        latitude: 51.5258085,
        longitude: -0.1304374
      }      
    },
    getCurrentPositionOpts: {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    }
  },
  mapOptions: {
    zoom: 13
  },
  defaults: {  
  }
};
