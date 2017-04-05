import userService from '../services/userService.js';
import jwt from 'jwt-simple';
import cfg from '../auth/config.js';
import Auth from '../auth/auth.js';

const tokenRoutes = (app) => {
  const service = userService();
  /* GENERATE TOKEN */
  app.post('/token', (req, res) => {
      if (req.body.userName && req.body.password) {
        const username = req.body.userName;
        const password = req.body.password;
        const query = {'userName':username, 'password': password};
        const findPromise = service.findUser(query);
        findPromise.then((user) => {
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
  /* VALIDATE TOKEN */
  app.get("/token", Auth().authenticate(), function(req, res) {
    res.sendStatus(200);
  });
};

export default tokenRoutes;
