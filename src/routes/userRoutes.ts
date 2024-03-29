import { Express, Request } from 'express';
import { Span, Tags } from 'opentracing';
import grpc from 'grpc';
import config from 'config';
import { NotificationRequest, Parameter } from '../grpc-services/notification_pb';
import client from '../client/loggingClient';
import userService from '../services/userService';
import Auth from '../auth/auth';
import { Log } from '../grpc-services/logging_pb';
import { getForwardHeaders, addJaegerHeadersToMetadata } from '../tracing/getForwardHeaders';
import notificationClient from '../client/notificationServiceClient';
import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

interface RequestWithSpan extends Request {
  span?: Span;
}
const notificationEnabled = config.get<boolean>('notificationEnabled');
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

  const userList = [
    { cursor: 'AA', name: 'matt', id: 1 },
    { cursor: 'AA', name: 'john', id: 2 },
    { cursor: 'BB', name: 'peter', id: 3 },
    { cursor: 'BB', name: 'gus', id: 4 },
    { cursor: 'CC', name: 'liam', id: 5 },
    { cursor: 'CC', name: 'gael', id: 6 },
  ];

  const nextCur = (cursor: string) => {
    if (cursor === 'AA') {
      return 'BB';
    } if (cursor === 'BB') {
      return 'CC';
    }
    return '';
  };

  app.post('/userPaginated', (req: RequestWithSpan, res) => {
    const { body } = req;
    const cursor = body.params.cursor ? body.params.cursor : 'AA';
    const data = userList.filter((u) => u.cursor === cursor).map((u) => ({
      cursor,
      node: u,
    }));
    const result = {
      data: {
        issuers: {
          edges: data,
          pageInfo: {
            hasNextPage: cursor !== 'CC',
            endCursor: nextCur(cursor),
          },
          totalCount: userList.length,
        },
      }
      ,
    };
    res.json(result);
  });

  app.post('/user', Auth().authenticate('validateOnlyToken'), (req: RequestWithSpan, res) => {
    service.saveUser(req.body).then((user) => {
      if (notificationEnabled) {
        sendCreateNotification(user.userName);
      }
      res.json(user);
    }).catch((err) => {
      const errResponse = { info: 'error during save user', error: err.message };
      const { span } = req;
      span?.setTag(Tags.ERROR, true);
      span?.setTag('errorMessage', errResponse);
      res.status(400).json(errResponse);
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
    addJaegerHeadersToMetadata(forwardHeaders, metadata);
    client.logInfo(log, metadata, (err) => {
      if (err) {
        logger.error(['error calling logging:', err.message, err.details]);
      }
    });
    service.findUsers({}, { userName: 'asc' }).then((users) => {
      res.json(users);
    }).catch((err) => {
      res.json({ info: 'error during find users', error: err });
    });
  });

  app.post('/clear', Auth().authenticate('validateOnlyToken'), (_, res) => {
    service.clearCache().then(() => {
      res.json({ message: 'cache clear' });
    });
  });
};

export default userRoutes;
