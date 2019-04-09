import client from '../client/loggingClient';
import userService from '../services/userService';
import Auth from '../auth/auth';

const userRoutes = (app) => {
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
    client.logInfo({ text: 'calling findUsers', severity: 1 }, () => ({}));
    service.findUsers({}, { userName: 'asc' }).then((users) => {
      res.json(users);
    }).catch((err) => {
      res.json({ info: 'error during find users', error: err });
    });
  });
};

export default userRoutes;
