import proxyquire from 'proxyquire';
import tape from 'tape';
import sinon from 'sinon';
import _test from 'tape-promise';
import jwt from 'jwt-simple';
import config from 'config';

const test = _test(tape);

const userServiceStub = {
  default: () => ({
    findUser: (data) => new Promise((resolve) => {
      if (data.userName === 'matt') {
        resolve({ userName: 'matt' });
      } else {
        resolve(null);
      }
    }),
  }),
};

const tokenRepositoryStub = (saveStub = () => {}) => ({
  default: () => ({
    saveToken: saveStub,
  }),
});

const serviceFactory = {
  getService: (stub, repoStub) => proxyquire('../services/tokenService', { './userService': stub, '../dataAccess/tokenRepository': repoStub}),
};

test('tokenService.generateToken(), user found, returns token with all required values.', (t) => {
  const saveTokenStub = sinon.stub();
  const service = serviceFactory.getService(userServiceStub, tokenRepositoryStub(saveTokenStub)).default();
  const creds = { userName: 'matt', password: '1234' };
  const cfg = config.get('auth');

  return service.generateToken(creds).then((data) => {
    const decoded = jwt.decode(data.token, cfg.accessToken.jwtSecret);
    t.equal(decoded.userName, creds.userName);
    t.equal(decoded.iss, cfg.issuer);
    t.equal(decoded.aud, cfg.audience);
    t.ok(decoded.exp > 0);
    t.ok(saveTokenStub.calledOnceWith({userName: creds.userName, refreshToken: data.refreshToken}), 'saveToken called once with userName and refreshtoken');
    t.end();
  });
});

test('tokenService.generateToken(), user not found, returns null.', (t) => {
  const service = serviceFactory.getService(userServiceStub, tokenRepositoryStub()).default();
  const creds = { userName: 'matteo', password: '1234' };

  return service.generateToken(creds).then((data) => {
    t.ok(data == null);
    t.end();
  });
});

test('tokenService.generateToken(), missing userName and password, returns null.', (t) => {
  const service = serviceFactory.getService(userServiceStub, tokenRepositoryStub()).default();
  const creds = { };
  return service.generateToken(creds).then((data) => {
    t.ok(data == null);
    t.end();
  });
});
