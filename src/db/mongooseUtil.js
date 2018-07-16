import mongoose from 'mongoose';
import getConnectionString from './connectionString.js';
import mongooseOptions from './mongooseOptions.js';
import connectionEvents from './connectionEvents.js';
import Debug  from 'debug'; 
import DebugNamespaces from '../util/debugNameSpaces';

const debug = Debug(DebugNamespaces.mongo);

const mongooseUtil = () => {
  const connect = () => {
    if(mongoose.connection.readyState === 0) {
      debug('Not connected to db, trying to connect...');
      const connString = getConnectionString();
      connectionEvents(mongoose);
      mongoose.connect(connString, mongooseOptions);
    }
  };

  return {
    connect
  };
};

export default mongooseUtil;
