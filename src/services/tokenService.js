import jwt from 'jwt-simple';
import userService from './userService.js';
import cfg from '../auth/config.js';
import moment from 'moment';

const tokenService = () => {
  const service = userService();
  const _generate = (requestData) => {
    const findPromise = service.findUser(requestData);
    return findPromise.then((user) => {
      if (user) {
          const payload = {
              userName: user.userName,
              iss: cfg.issuer,
              aud: cfg.audience,
              exp: moment().add(1, 'hours').unix()
          };
          return jwt.encode(payload, cfg.jwtSecret);
      } else {
          return null;
      }
    });
  };

  return {
    generateToken: _generate
  };
};

export default tokenService;
