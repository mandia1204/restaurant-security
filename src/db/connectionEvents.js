import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

const logger = Logger(DebugNamespaces.mongo);

const connectionEvents = (mongoose) => {
  const conn = mongoose.connection;

  conn.on('connecting', () => {
    logger.info('connecting to MongoDB...');
  });
  conn.on('error', (error) => {
    logger.info(`Error in MongoDb connection: ${error}`);
  });
  conn.on('connected', () => {
    logger.info('MongoDB connected!');
  });
  conn.once('open', () => {
    logger.info('MongoDB connection opened!');
  });
  conn.on('reconnected', () => {
    logger.info('MongoDB reconnected!');
  });
  conn.on('disconnected', () => {
    logger.info('MongoDB disconnected!');
  });
};

export default connectionEvents;
