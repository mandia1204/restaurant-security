import proxyquire from 'proxyquire';
import request from 'supertest';
import test from 'tape';
import express from '../expressServer';

const routesFactory = {
  getRoutes: stub => proxyquire('../routes/tokenRoutes', { '../services/tokenService': stub }),
};

const tokenServiceStub = {
  default: () => ({
    generateToken: data => new Promise((resolve) => {
      if (data.userName === 'matt') {
        resolve({ token: 'token_generated', refreshToken: 'refresh_token_generated' });
      } else {
        resolve(null);
      }
    }),
  }),
};

const gethttpServer = (port, routes) => {
  const app = express().getServer();
  routes.default(app);

  const server = app.listen(port);
  return { app, server };
};

test('tokenRoutes, POST /token with valid user, returns token.', (t) => {
  const routes = routesFactory.getRoutes(tokenServiceStub);
  const creds = { userName: 'matt', password: '1234' };
  const httpServer = gethttpServer(3005, routes);

  request(httpServer.app)
    .post('/token')
    .send(creds)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const response = res.body;
      t.error(err, 'error returned');
      t.ok(response.token != null);
      t.end();

      httpServer.server.close();
    });
});

test('tokenRoutes, POST /token with invalid user, returns 401.', (t) => {
  const routes = routesFactory.getRoutes(tokenServiceStub);
  const creds = { userName: 'matteo', password: '1234' };
  const httpServer = gethttpServer(3006, routes);

  request(httpServer.app)
    .post('/token')
    .send(creds)
    .expect(401)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      const response = res.body;
      t.error(err, 'error returned');
      t.ok(response.token == null);
      t.end();

      httpServer.server.close();
    });
});

test('tokenRoutes, POST /token with no credential, returns 401.', (t) => {
  const routes = routesFactory.getRoutes(tokenServiceStub);
  const creds = {};
  const httpServer = gethttpServer(3007, routes);

  request(httpServer.app)
    .post('/token')
    .send(creds)
    .expect(401)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      const response = res.body;
      t.error(err, 'error returned');
      t.ok(response.token == null, 'Token is null.');
      t.end();

      httpServer.server.close();
    });
});
