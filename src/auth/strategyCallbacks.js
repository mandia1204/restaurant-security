import userService from '../services/userService.js';

const strategyCallbacks = () => {
  const service = userService();

  return {
    validateDb: (payload, done) => {
        console.log('using strategyValidateUserDbCallback');
        service.findUser({ userName: payload.userName}).then((user) => {
          if(user){
            return done(null, { userName: user.userName });
          }else{
            return done(new Error('User not found'), null);
          }
        });
    },
    validate: (payload, done) => {
        console.log('using strategyValidateCallback');
        return done(null, { userName: payload.userName });
    }
  };
};

export default strategyCallbacks;
