import bluebird from 'bluebird';

const mongooseOptions = {
  promiseLibrary: bluebird,
  server: { auto_reconnect:true, reconnectTries: 10 }
};

export default mongooseOptions;
