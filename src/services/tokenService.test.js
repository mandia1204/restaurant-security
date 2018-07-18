import proxyquire from 'proxyquire';
import tape from 'tape';
import _test from 'tape-promise';
import jwt from 'jwt-simple';
import cfg from '../auth/config';

const test = _test(tape);

const userServiceStub = {
  default: () => ({
    findUser: data => new Promise((resolve) => {
      if (data.userName === 'matt') {
        resolve({ userName: 'matt' });
      } else {
        resolve(null);
      }
    }),
  }),
};

const serviceFactory = {
  getService: stub => proxyquire('../services/tokenService', { './userService': stub }),
};

test('tokenService, user found, returns token with all required values.', (t) => {
  const service = serviceFactory.getService(userServiceStub).default();
  const data = { userName: 'matt' };
  return service.generateToken(data).then((token) => {
    const decoded = jwt.decode(token, cfg.jwtSecret);
    const valid = decoded.userName === data.userName && decoded.iss === cfg.issuer
      && decoded.aud === cfg.audience && decoded.exp > 0;
    t.ok(valid, 'token passed correctly.');
    t.end();
  });
});

test('tokenService, user not found, returns null.', (t) => {
  const service = serviceFactory.getService(userServiceStub).default();
  const data = { userName: 'matteo' };

  return service.generateToken(data).then((token) => {
    t.ok(token == null, 'token is null.');
    t.end();
  });
});
