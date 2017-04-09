import passport from 'passport';
import passportJWT from 'passport-jwt';
import strategyCallbacks from './strategyCallbacks.js';
import cfg from './config.js';
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
};

const Auth = () => {

    const cbs = strategyCallbacks();
    const strategyDb = new Strategy(params, cbs['validateDb']);
    const strategy = new Strategy(params, cbs['validate']);

    passport.use('validateWithDb', strategyDb);
    passport.use('validateOnlyToken', strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: (strategy) => {
            return passport.authenticate(strategy, cfg.jwtSession);
        }
    };
};

export default Auth;
