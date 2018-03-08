module.exports = process.env.NODE_ENV !== 'test' ? {} : {
  environment: 'test',
  apiBase: 'http://worker.flexy.com'
};
