import Debug  from 'debug'; 
import DebugNamespaces from '../util/debugNameSpaces';

const debug = Debug(DebugNamespaces.mongo);

const connectionEvents = (mongoose) => {
  const conn = mongoose.connection;

  conn.on('connecting', function() {
    debug('connecting to MongoDB...');
  });
  conn.on('error', function(error) {
    debug(`Error in MongoDb connection: ${error}`);
  });
  conn.on('connected', function() {
    debug('MongoDB connected!');
  });
  conn.once('open', function() {
    debug('MongoDB connection opened!');
  });
  conn.on('reconnected', function () {
    debug('MongoDB reconnected!');
  });
  conn.on('disconnected', function() {
    debug('MongoDB disconnected!');
  });
};

export default connectionEvents;
