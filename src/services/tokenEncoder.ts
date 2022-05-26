import jwt from 'jwt-simple';
import moment from 'moment';
import config from 'config';
import fs from 'fs';
import path from 'path';
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

function encodeWithSecret(userName: string, type: TokenType) {
  const payload = getTokenPayload(userName, type);
  return jwt.encode(payload, authConfig[type].jwtSecret);
}

function sign(userName: string, type: TokenType) {
  const payload = getTokenPayload(userName, type);
  const baseDir: string = config.get('baseDir');
  const privateKey = fs.readFileSync(path.join(baseDir, 'keys', 'private-key.key'), 'utf8');
  return jwt.encode(payload, privateKey, 'RS256');
}

function encode(userName: string, type: TokenType) {
  if (authConfig.useRsa) {
    return sign(userName, type);
  }
  return encodeWithSecret(userName, type);
}

const tokenEncoder = () => ({
  encode,
});
export default tokenEncoder;
