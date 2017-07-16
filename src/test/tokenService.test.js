import proxyquire from 'proxyquire';
import test from 'tape';
import jwt from 'jwt-simple';
import cfg from '../auth/config.js';

const userServiceStub = { default: () => {
  return {
    findUser : (data) => {
      return new Promise((resolve, reject) => {
        if(data.userName == 'matt') {
          resolve({userName: 'matt'});
        }else {
          resolve(null);
        }
      });
    }
  }
}};

const serviceFactory = {
  getService: (stub) => {
    return proxyquire('../services/tokenService.js', { './userService.js': stub });
  }
};

test('user found, returs token with all required values.', (t) => {
  const service = serviceFactory.getService(userServiceStub).default();
  const data = {userName: 'matt'};

  const promise = service.generateToken(data).then((token) => {
    const decoded = jwt.decode(token, cfg.jwtSecret);
    const valid = decoded.userName === data.userName && decoded.iss === cfg.issuer
      && decoded.aud === cfg.audience && decoded.exp>0;
    t.ok(valid, 'token passed correctly.');
    t.end();
  });
});

test('user not found, returns null.', (t) => {
  const service = serviceFactory.getService(userServiceStub).default();
  const data = {userName: 'matteo'};

  const promise = service.generateToken(data).then((token) => {
    t.ok(token == null, 'token is null.');
    t.end();
  });
});
