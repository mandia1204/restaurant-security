import { FORMAT_HTTP_HEADERS, SpanOptions } from 'opentracing';
import { Express } from 'express';
import TokenService from '../services/tokenService';
import Auth from '../auth/auth';
import { getTracer } from '../tracing/tracer';

const tokenRoutes = (app: Express) => {
  const tokenService = TokenService();
  const tracer = getTracer();
  // generate token
  app.post('/token', (req, res) => {
    const spanOptions: SpanOptions = { };
    const spanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers);
    if (spanContext) {
      spanOptions.childOf = spanContext;
    }

    const span = tracer.startSpan('create_token', spanOptions);
    tokenService.generateToken(req.body).then((data) => {
      if (data) {
        span.finish();
        res.json(data);
      } else {
        res.sendStatus(401);
      }
    });
  });
  // validate token
  app.get('/token', Auth().authenticate('validateWithDb'), (req, res) => {
    res.sendStatus(200);
  });
  // refresh access token
  app.post('/refresh', (req, res) => {
    tokenService.refreshAccessToken(req.body).then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.sendStatus(401);
      }
    });
  });
};

export default tokenRoutes;
