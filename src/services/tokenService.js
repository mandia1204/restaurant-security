import jwt from 'jwt-simple';
import moment from 'moment';
import Debug from 'debug';
import config from 'config';
import userService from './userService';
import DebugNamespaces from '../util/debugNameSpaces';

const debug = Debug(DebugNamespaces.token);
const authConfig = config.get('auth');

const tokenService = () => {
  const service = userService();

  const getTokenPayload = (user, authCfg) => ({
    userName: user.userName,
    iss: authCfg.issuer,
    aud: authCfg.audience,
    exp: moment().add(1, 'hours').unix(),
  });

  const generateToken = (requestData) => {
    if (!requestData.userName || !requestData.password) {
      debug('null userName or password');
      return Promise.resolve(null);
    }
    const findPromise = service.findUser(requestData);
    return findPromise.then((user) => {
      if (!user) {
        return null;
      }
      const token = jwt.encode(getTokenPayload(user, authConfig), authConfig.jwtSecret);
      const refreshToken = jwt.encode(getTokenPayload(user, authConfig), authConfig.jwtRefreshSecret);
      return {
        token,
        refreshToken,
      };
    }).catch((err) => {
      debug(err);
      return null;
    });
  };

  return {
    generateToken,
  };
};

export default tokenService;
