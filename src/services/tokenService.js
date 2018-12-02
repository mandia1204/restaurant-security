import Debug from 'debug';
import UserService from './userService';
import DebugNamespaces from '../util/debugNameSpaces';
import TokenDao from '../dataAccess/tokenDao';
import TokenEncoder from './tokenEncoder';

const debug = Debug(DebugNamespaces.token);
const tokenService = () => {
  const userService = UserService();
  const tokenDao = TokenDao();
  const tokenEncoder = TokenEncoder();

  const generateToken = (requestData) => {
    if (!requestData.userName || !requestData.password) {
      debug('null userName or password');
      return Promise.resolve(null);
    }
    const findPromise = userService.findUser(requestData);
    return findPromise.then((user) => {
      if (!user) {
        return null;
      }
      const token = tokenEncoder.encode(user.userName, 'accessToken');
      const refreshToken = tokenEncoder.encode(user.userName, 'refreshToken');
      tokenDao.saveToken({ userName: user.userName, refreshToken });
      return {
        token,
        refreshToken,
      };
    }).catch((err) => {
      debug(err);
      return null;
    });
  };

  const refreshAccessToken = ({ userName, refreshToken }) => {
    if (!userName || !refreshToken) {
      debug('null userName or refreshToken');
      return Promise.resolve(null);
    }
    const findTokenPromise = tokenDao.findToken({ refreshToken, userName });
    return findTokenPromise.then((token) => {
      if (!token) {
        return null;
      }
      const tokenEncoded = tokenEncoder.encode(userName, 'accessToken');
      return {
        token: tokenEncoded,
      };
    }).catch((err) => {
      debug(err);
      return null;
    });
  };

  return {
    generateToken,
    refreshAccessToken,
  };
};

export default tokenService;
