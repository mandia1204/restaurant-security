import Debug from 'debug';

const logger = (namespace) => {
  const debug = Debug(namespace);
  const errorDebug = Debug(namespace);
  debug.log = console.log.bind(console); // eslint-disable-line no-console

  const info = (...args) => {
    debug(...args);
  };

  const error = (...args) => {
    errorDebug(...args);
  };

  return {
    info,
    error,
  };
};

export default logger;
