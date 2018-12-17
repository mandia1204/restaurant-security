import mongoose from 'mongoose';
import getConnectionString from './connectionString';
import mongooseOptions from './mongooseOptions';
import connectionEvents from './connectionEvents';
import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

const logger = Logger(DebugNamespaces.mongo);

const mongooseUtil = () => {
  const connect = () => {
    if (mongoose.connection.readyState === 0) {
      logger.info('Not connected to db, trying to connect...');
      const connString = getConnectionString();
      connectionEvents(mongoose);
      mongoose.connect(connString, mongooseOptions);
    }
  };

  return {
    connect,
  };
};

export default mongooseUtil;
