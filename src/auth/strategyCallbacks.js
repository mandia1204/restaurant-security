import userService from '../services/userService.js';
import Debug  from 'debug'; 
import DebugNamespaces from '../util/debugNameSpaces';

const debug = Debug(DebugNamespaces.strategyCallback);

const strategyCallbacks = () => {
  const service = userService();

  return {
    validateDb: (payload, done) => {
        debug('using strategyValidateUserDbCallback');
        service.findUser({ userName: payload.userName}).then((user) => {
          if(user){
            return done(null, { userName: user.userName });
          }else{
            return done(new Error('User not found'), null);
          }
        });
    },
    validate: (payload, done) => {
        debug('using strategyValidateCallback');
        return done(null, { userName: payload.userName });
    }
  };
};

export default strategyCallbacks;
