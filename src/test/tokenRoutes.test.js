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
        resolve('token_generated');
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

test('POST /token, valid user returns token.', (t) => {
  const routes = routesFactory.getRoutes(tokenServiceStub);
  const data = { userName: 'matt', password: '1234' };
  const httpServer = gethttpServer(3005, routes);

  request(httpServer.app)
    .post('/token')
    .send(data)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const response = res.body;
      t.error(err, 'No error');
      t.ok(response.token != null, 'Token is not null.');
      t.end();

      httpServer.server.close();
    });
});

test('POST /token, invalid user returns 401.', (t) => {
  const routes = routesFactory.getRoutes(tokenServiceStub);
  const data = { userName: 'matteo', password: '1234' };
  const httpServer = gethttpServer(3006, routes);

  request(httpServer.app)
    .post('/token')
    .send(data)
    .expect(401)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      const response = res.body;
      t.error(err, 'No error');
      t.ok(response.token == null, 'Token is null.');
      t.end();

      httpServer.server.close();
    });
});

test('POST /token, no credential returns 401.', (t) => {
  const routes = routesFactory.getRoutes(tokenServiceStub);
  const data = {};
  const httpServer = gethttpServer(3007, routes);

  request(httpServer.app)
    .post('/token')
    .send(data)
    .expect(401)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      const response = res.body;
      t.error(err, 'No error');
      t.ok(response.token == null, 'Token is null.');
      t.end();

      httpServer.server.close();
    });
});
