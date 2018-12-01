import tokenService from '../services/tokenService';
import Auth from '../auth/auth';

const tokenRoutes = (app) => {
  const service = tokenService();
  // generate token
  app.post('/token', (req, res) => {
    service.generateToken(req.body).then((token) => {
      if (token) {
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    });
  });
  // validate token
  app.get('/token', Auth().authenticate('validateWithDb'), (req, res) => {
    res.sendStatus(200);
  });
};

export default tokenRoutes;
