import jwt from 'jwt-simple';
import userService from './userService.js';
import cfg from '../auth/config.js';
import moment from 'moment';
import Debug  from 'debug';
import DebugNamespaces from '../util/debugNameSpaces';

const debug = Debug(DebugNamespaces.token);

const tokenService = () => {
  const service = userService();
  const generateToken = requestData => {
    const findPromise = service.findUser(requestData);
    return findPromise.then(user => {
      if (user) {
          const payload = {
              userName: user.userName,
              iss: cfg.issuer,
              aud: cfg.audience,
              exp: moment().add(1, 'hours').unix()
          };
          return jwt.encode(payload, cfg.jwtSecret);
      }
      return null;
    }).catch(err => {
      debug(err);
      return null;
    });
  };

  return {
    generateToken
  };
};

export default tokenService;
