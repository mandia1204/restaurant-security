import passport from 'passport';
import passportJWT from 'passport-jwt';
import strategyCallbacks from './strategyCallbacks';
import cfg from './config';

// const ExtractJwt = passportJWT.ExtractJwt;
// const Strategy = passportJWT.Strategy;
const { ExtractJwt, Strategy } = passportJWT;

const params = {
  secretOrKey: cfg.jwtSecret,
  issuer: cfg.issuer,
  audience: cfg.audience,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  ignoreExpiration: false,
};
let instance;
const Auth = () => {
  if (instance) {
    return instance;
  }
  const cbs = strategyCallbacks();
  const strategyDb = new Strategy(params, cbs.validateDb);
  const strategy = new Strategy(params, cbs.validate);

  passport.use('validateWithDb', strategyDb);
  passport.use('validateOnlyToken', strategy);
  // TODO: TEST
  instance = {
    initialize: () => passport.initialize(),
    authenticate: s => passport.authenticate(s, cfg.jwtSession),
  };
  return instance;
};

export default Auth;
