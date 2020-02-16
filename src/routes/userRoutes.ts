import { Express } from 'express';
import client from '../client/loggingClient';
import userService from '../services/userService';
import Auth from '../auth/auth';
import { Log } from '../grpc-services/logging_pb';

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

  app.get('/user', Auth().authenticate('validateOnlyToken'), (req, res) => {
    const log = new Log();
    log.setText('calling findUsers');
    log.setSeverity(1);
    client.logInfo(log, () => ({}));
    service.findUsers({}, { userName: 'asc' }).then((users) => {
      res.json(users);
    }).catch((err) => {
      res.json({ info: 'error during find users', error: err });
    });
  });
};

export default userRoutes;
