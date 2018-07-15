import tokenService from '../services/tokenService.js';
import Auth from '../auth/auth.js';

const tokenRoutes = (app) => {
  const service = tokenService();
  /* GENERATE TOKEN */
  app.post('/token', (req, res) => {
      if (req.body.userName && req.body.password) {
        const query = {'userName': req.body.userName, 'password': req.body.password};
        service.generateToken(query).then((token) => {
          if(token) {
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
  app.get('/token', Auth().authenticate('validateWithDb'), (req, res) => {
    res.sendStatus(200);
  });
};

export default tokenRoutes;
