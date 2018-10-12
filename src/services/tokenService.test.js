import proxyquire from 'proxyquire';
import tape from 'tape';
import _test from 'tape-promise';
import jwt from 'jwt-simple';
import config from 'config';

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

test('tokenService.generateToken(), user found, returns token with all required values.', (t) => {
  const service = serviceFactory.getService(userServiceStub).default();
  const data = { userName: 'matt' };
  const cfg = config.get('auth');
  return service.generateToken(data).then((token) => {
    const decoded = jwt.decode(token, cfg.jwtSecret);
    t.equal(decoded.userName, data.userName);
    t.equal(decoded.iss, cfg.issuer);
    t.equal(decoded.aud, cfg.audience);
    t.ok(decoded.exp > 0);
    t.end();
  });
});

test('tokenService.generateToken(), user not found, returns null.', (t) => {
  const service = serviceFactory.getService(userServiceStub).default();
  const data = { userName: 'matteo' };

  return service.generateToken(data).then((token) => {
    t.ok(token == null, 'token is null.');
    t.end();
  });
});
