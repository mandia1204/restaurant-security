import User from '../models/userModel.js';
import jwt from 'jwt-simple';
import cfg from '../auth/config.js';

const tokenRoutes = (app) => {
  /* GENERATE TOKEN */
  app.post('/token', (req, res) => {
      if (req.body.userName && req.body.password) {
        const username = req.body.userName;
        const password = req.body.password;
        const query = {'userName':username, 'password': password};
        const findOnePromise = User.findOne(query).exec();
        findOnePromise.then((user) => {
          if (user) {
              const payload = {
                  userName: user.userName
              };
              const token = jwt.encode(payload, cfg.jwtSecret);
              res.json({ token: token });
          } else {
              res.sendStatus(401);
          }
        });
    } else {
        res.sendStatus(401);
    }
  });
};

export default tokenRoutes;
