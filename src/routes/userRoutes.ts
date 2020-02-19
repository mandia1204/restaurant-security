import { Express, Request } from 'express';
import { Span } from 'opentracing';
import grpc from 'grpc';
import client from '../client/loggingClient';
import userService from '../services/userService';
import Auth from '../auth/auth';
import { Log } from '../grpc-services/logging_pb';
import { getForwardHeaders, addJaegerHeaders } from '../tracing/getForwardHeaders';

interface RequestWithSpan extends Request {
  span?: Span;
  spanHeaders?: any;
}

const userRoutes = (app: Express) => {
  const service = userService();

  app.post('/user', Auth().authenticate('validateOnlyToken'), (req, res) => {
    service.saveUser(req.body).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json({ info: 'error during save user', error: err });
    });
  });

  app.put('/user', Auth().authenticate('validateOnlyToken'), (req, res) => {
    service.updateUser(req.body).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json({ info: 'error during update user', error: err });
    });
  });

  app.get('/user', Auth().authenticate('validateOnlyToken'), (req: RequestWithSpan, res) => {
    const log = new Log();
    const { span } = req;

    log.setText('calling findUsers');
    log.setSeverity(1);
    const metadata = new grpc.Metadata();
    const forwardHeaders = getForwardHeaders(span, req);
    addJaegerHeaders(forwardHeaders, metadata);
    client.logInfo(log, metadata, () => ({}));
    service.findUsers({}, { userName: 'asc' }).then((users) => {
      res.json(users);
    }).catch((err) => {
      res.json({ info: 'error during find users', error: err });
    });
  });
};

export default userRoutes;
