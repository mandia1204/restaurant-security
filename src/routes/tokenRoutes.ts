import { Express, Request } from 'express';
import { Span } from 'jaeger-client/node_modules/opentracing';
import TokenService from '../services/tokenService';
import Auth from '../auth/auth';

interface RequestWithSpan extends Request {
  span?: Span;
}

const tokenRoutes = (app: Express) => {
  const tokenService = TokenService();
  app.post('/token', (req: RequestWithSpan, res) => {
    const { span } = req;
    if (span) {
      span.setTag('someTag', 'some value');
      span.log({ message: 'custom log' });
      span.setBaggageItem('memberid', 'my test');
    }
    tokenService.generateToken(req.body).then((data) => {
      if (data) {
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
