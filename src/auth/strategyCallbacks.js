import userService from '../services/userService';
import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

const logger = Logger(DebugNamespaces.strategyCallback);

const strategyCallbacks = () => {
  const service = userService();

  return {
    validateDb: (payload, done) => {
      logger.info('using strategyValidateUserDbCallback');
      service.findUser({ userName: payload.userName }).then((user) => {
        if (user) {
          return done(null, { userName: user.userName });
        }
        return done(new Error('User not found'), null);
      });
    },
    validate: (payload, done) => {
      logger.info('using strategyValidateCallback');
      return done(null, { userName: payload.userName });
    },
  };
};

export default strategyCallbacks;
