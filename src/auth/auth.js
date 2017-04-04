import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/userModel.js';
import cfg from './config.js';
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const Auth = () => {
    const strategy = new Strategy(params, (payload, done) => {
        const user = User.find({ userName: payload.userName});
        console.log('using strategy');
        if (user) {
            return done(null, {
                userName: user.userName
            });
        } else {
            return done(new Error("User not found"), null);
        }
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
