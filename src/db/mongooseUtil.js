import mongoose from 'mongoose';
import getConnectionString from './connectionString.js';
import mongooseOptions from './mongooseOptions.js';
import connectionEvents from './connectionEvents.js';

const mongooseUtil = () => {
  const _connect = () => {
    if(mongoose.connection.readyState === 0) {
      console.log('Not connected to db, trying to connect...');
      const connString = getConnectionString();
      connectionEvents(mongoose);
      mongoose.connect(connString, mongooseOptions);
    }
  };

  return {
    connect: _connect
  }
};

export default mongooseUtil;
