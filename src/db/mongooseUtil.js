import mongoose from 'mongoose';
import Debug from 'debug';
import getConnectionString from './connectionString';
import mongooseOptions from './mongooseOptions';
import connectionEvents from './connectionEvents';
import DebugNamespaces from '../util/debugNameSpaces';

const debug = Debug(DebugNamespaces.mongo);

const mongooseUtil = () => {
  const connect = () => {
    if (mongoose.connection.readyState === 0) {
      debug('Not connected to db, trying to connect...');
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
