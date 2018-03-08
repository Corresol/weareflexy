module.exports = process.env.NODE_ENV !== 'development' ? {} : {
  environment: 'development',
  apiBase: 'http://worker.flexy.com',
  axiosDefaults: { withCredentials: true }
};