import TokenService from '../services/tokenService';
import Auth from '../auth/auth';

const tokenRoutes = (app) => {
  const tokenService = TokenService();
  // generate token
  app.post('/token', (req, res) => {
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
