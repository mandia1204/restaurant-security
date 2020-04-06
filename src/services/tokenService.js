import UserService from './userService';
import DebugNamespaces from '../util/debugNameSpaces';
import TokenRepository from '../dataAccess/tokenRepository';
import TokenEncoder from './tokenEncoder';
import Logger from '../util/logger';

const logger = Logger(DebugNamespaces.token);
const tokenService = () => {
  const userService = UserService();
  const repo = TokenRepository();
  const tokenEncoder = TokenEncoder();

  const generateToken = (requestData) => {
    if (!requestData.userName || !requestData.password) {
      logger.info('null userName or password');
      return Promise.resolve(null);
    }
    const findPromise = userService.findUser(requestData);
    return findPromise.then((user) => {
      if (!user) {
        return null;
      }
      const token = tokenEncoder.encode(user.userName, 'accessToken');
      const refreshToken = tokenEncoder.encode(user.userName, 'refreshToken');
      repo.saveToken({ userName: user.userName, refreshToken });
      return {
        token,
        refreshToken,
      };
    }).catch((err) => {
      logger.error(err);
      return null;
    });
  };

  const refreshAccessToken = ({ userName, refreshToken }) => {
    if (!userName || !refreshToken) {
      logger.info('null userName or refreshToken');
      return Promise.resolve(null);
    }
    const findTokenPromise = repo.findToken({ refreshToken, userName });
    return findTokenPromise.then((token) => {
      if (!token) {
        return null;
      }
      const tokenEncoded = tokenEncoder.encode(userName, 'accessToken');
      return {
        token: tokenEncoded,
      };
    }).catch((err) => {
      logger.error(err);
      return null;
    });
  };

  return {
    generateToken,
    refreshAccessToken,
  };
};

export default tokenService;
