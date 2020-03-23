import mongoose from 'mongoose';
import bluebird from 'bluebird';
import getConnectionString from './connectionString';
import connectionEvents from './connectionEvents';
import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

const logger = Logger(DebugNamespaces.mongo);

const options = {
  promiseLibrary: bluebird,
  autoReconnect: true,
  reconnectTries: 3,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
};

const mongooseUtil = () => {
  const connect = () => {
    if (mongoose.connection.readyState === 0) {
      logger.info('Not connected to db, trying to connect...');
      const connString = getConnectionString();
      connectionEvents(mongoose);
      mongoose.connect(connString, options);
    }
  };

  return {
    connect,
  };
};

export default mongooseUtil;
