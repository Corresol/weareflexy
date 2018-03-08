module.exports = process.env.NODE_ENV !== 'production' ? {} : {
  environment: 'production',
  apiBase: 'http://worker.flexy.com'
};
