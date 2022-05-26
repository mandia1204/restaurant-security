import jwt from 'jwt-simple';
import moment from 'moment';
import config from 'config';
import { Auth } from '../types/config';

const authConfig = config.get<Auth>('auth');

type TokenType = 'accessToken' | 'refreshToken';

function getTokenPayload(userName: string, type: TokenType) {
  const { exp } = authConfig[type];
  return {
    userName,
    iss: authConfig.issuer,
    aud: authConfig.audience,
    exp: moment().add(exp.amount, exp.unit).unix(),
  };
}

function encode(userName: string, type: TokenType) {
  return jwt.encode(getTokenPayload(userName, type), authConfig[type].jwtSecret);
}

const tokenEncoder = () => ({
  encode,
});
export default tokenEncoder;
