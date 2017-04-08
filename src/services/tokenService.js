import jwt from 'jwt-simple';
import userService from './userService.js';
import cfg from '../auth/config.js';

const tokenService = () => {
  const service = userService();
  const _generate = (requestData) => {
    const findPromise = service.findUser(requestData);
    return findPromise.then((user) => {
      if (user) {
          const payload = {
              userName: user.userName
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
