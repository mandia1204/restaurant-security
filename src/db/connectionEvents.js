import Debug from 'debug';
import DebugNamespaces from '../util/debugNameSpaces';

const debug = Debug(DebugNamespaces.mongo);

const connectionEvents = (mongoose) => {
  const conn = mongoose.connection;

  conn.on('connecting', () => {
    debug('connecting to MongoDB...');
  });
  conn.on('error', (error) => {
    debug(`Error in MongoDb connection: ${error}`);
  });
  conn.on('connected', () => {
    debug('MongoDB connected!');
  });
  conn.once('open', () => {
    debug('MongoDB connection opened!');
  });
  conn.on('reconnected', () => {
    debug('MongoDB reconnected!');
  });
  conn.on('disconnected', () => {
    debug('MongoDB disconnected!');
  });
};

export default connectionEvents;
