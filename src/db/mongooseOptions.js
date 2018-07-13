import bluebird from 'bluebird';

export default {
  promiseLibrary: bluebird,
  autoReconnect: true,
  reconnectTries: 3,
  useNewUrlParser: true
};