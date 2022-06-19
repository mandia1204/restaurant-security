import jwt from 'jwt-simple';
import moment from 'moment';
import config from 'config';
import fs from 'fs';
import path from 'path';
import base64url from 'base64url';
import { KMSClient, SignCommand } from '@aws-sdk/client-kms';
import { Auth } from '../types/config';
import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

const logger = Logger(DebugNamespaces.token);

const authConfig = config.get<Auth>('auth');
type TokenType = 'accessToken' | 'refreshToken';

function getKmsSignCommand(message: Uint8Array | undefined) {
  return new SignCommand({
    KeyId: authConfig.kmsId,
    SigningAlgorithm: 'RSASSA_PKCS1_V1_5_SHA_256',
    Message: message,
  });
}

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

const header = {
  alg: 'RS256',
  typ: 'JWT',
};

interface TokenComponents {
  header: string,
  payload: string,
  signature?: string,
}

const client = new KMSClient({ region: 'us-east-2' });

async function signWithKms(userName: string, type: TokenType) {
  logger.info('Signing with ksm...');
  const payload = getTokenPayload(userName, type);
  const tokenComponents: TokenComponents = {
    header: base64url(JSON.stringify(header)),
    payload: base64url(JSON.stringify(payload)),
  };

  const message = Buffer.from(`${tokenComponents.header}.${tokenComponents.payload}`);
  const command = getKmsSignCommand(message);
  const data = await client.send(command);
  const encodedSignature = base64url.encode(Buffer.from(data.Signature as Uint8Array), 'base64');
  tokenComponents.signature = encodedSignature
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return `${tokenComponents.header}.${tokenComponents.payload}.${tokenComponents.signature}`;
}

async function encode(userName: string, type: TokenType): Promise<string> {
  logger.info(`encoding token, useRsa:${authConfig.useRsa}, useKms:${authConfig.useKms}, type: ${type}`);
  if (authConfig.useRsa) {
    return sign(userName, type);
  } if (authConfig.useRsa && authConfig.useKms) {
    return signWithKms(userName, type);
  }
  return encodeWithSecret(userName, type);
}

const tokenEncoder = () => ({
  encode,
});
export default tokenEncoder;
