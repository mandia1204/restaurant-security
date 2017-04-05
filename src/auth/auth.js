import passport from 'passport';
import passportJWT from 'passport-jwt';
import userService from '../services/userService.js';
import cfg from './config.js';
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const Auth = () => {
    const service = userService();
    const strategy = new Strategy(params, (payload, done) => {
        console.log('using strategy');
        service.findUser({ userName: payload.userName}).then((user) => {
          if(user){
            return done(null, { userName: user.userName });
          }else{
            return done(new Error("User not found"), null);
          }
        });
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};

export default Auth;
