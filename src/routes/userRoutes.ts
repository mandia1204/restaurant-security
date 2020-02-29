import { Express, Request } from 'express';
import { Span } from 'opentracing';
import grpc from 'grpc';
import { NotificationRequest, Parameter } from '../grpc-services/notification_pb';
import client from '../client/loggingClient';
import userService from '../services/userService';
import Auth from '../auth/auth';
import { Log } from '../grpc-services/logging_pb';
import { getForwardHeaders, addJaegerHeaders } from '../tracing/getForwardHeaders';
import notificationClient from '../client/notificationServiceClient';
import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

interface RequestWithSpan extends Request {
  span?: Span;
  spanHeaders?: any;
}

const logger = Logger(DebugNamespaces.userRoutes);

const sendCreateNotification = (userName: string) => {
  const req = new NotificationRequest();
  req.setTemplateCode('CONFIRMATION_EMAIL');
  const p = new Parameter();
  p.setParameterName('userName');
  p.setParameterValue(userName);

  req.addParameters(p);
  notificationClient.sendNotification(req, (err, res) => {
    if (err) {
      throw new Error(err.message);
    }
    if (res) {
      logger.info(['response from notification:', res.getResult()]);
    }
  });
};

const userRoutes = (app: Express) => {
  const service = userService();

  app.post('/user', Auth().authenticate('validateOnlyToken'), (req, res) => {
    service.saveUser(req.body).then((user) => {
      sendCreateNotification(user.userName);
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
    client.logInfo(log, metadata, (err) => {
      console.log('ERR', err);
    });
    service.findUsers({}, { userName: 'asc' }).then((users) => {
      res.json(users);
    }).catch((err) => {
      res.json({ info: 'error during find users', error: err });
    });
  });
};

export default userRoutes;
