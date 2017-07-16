import proxyquire from 'proxyquire';
import request from 'supertest';
import test from 'tape';
import express from '../expressServer.js';

const _routesFactory = {
  getRoutes: (stub) => {
    return proxyquire('../routes/tokenRoutes.js', { '../services/tokenService.js': stub });
  }
};

const _tokenServiceStub = { default: () => {
  return {
    generateToken : (data) => {
      return new Promise((resolve, reject) => {
        if(data.userName == 'matt') {
          resolve('token_generated');
        }else {
          resolve(null);
        }
      });
    }
  }
}};

const _gehttpServer = (port, routes) => {
  const app = express().getServer();
  routes.default(app);

  const server = app.listen(port);
  return {app: app, server: server};
};

test('POST /token, valid user returns token.', (t) => {
  const routes = _routesFactory.getRoutes(_tokenServiceStub);
  const data = {userName: 'matt', password:'1234'};
  const httpServer = _gehttpServer(3005, routes);

  request(httpServer.app)
    .post('/token')
    .send(data)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      var response = res.body;
      t.error(err, 'No error');
      t.ok(response.token != null, 'Token is not null.');
      t.end();

      httpServer.server.close();
    });
});

test('POST /token, invalid user returns 401.', (t) => {
  const routes = _routesFactory.getRoutes(_tokenServiceStub);
  const data = {userName: 'matteo', password:'1234'};
  const httpServer = _gehttpServer(3006, routes);

  request(httpServer.app)
    .post('/token')
    .send(data)
    .expect(401)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      var response = res.body;
      t.error(err, 'No error');
      t.ok(response.token == null, 'Token is null.');
      t.end();

      httpServer.server.close();
    });
});

test('POST /token, no credential returns 401.', (t) => {
  const routes = _routesFactory.getRoutes(_tokenServiceStub);
  const data = {};
  const httpServer = _gehttpServer(3007, routes);

  request(httpServer.app)
    .post('/token')
    .send(data)
    .expect(401)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      var response = res.body;
      t.error(err, 'No error');
      t.ok(response.token == null, 'Token is null.');
      t.end();

      httpServer.server.close();
    });
});
