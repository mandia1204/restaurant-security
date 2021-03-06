import { Express } from 'express';
import roleService from '../services/roleService';

const roleRoutes = (app: Express) => {
  const service = roleService();

  app.get('/role', (req, res) => {
    service.getRoles().then((roles) => {
      res.json(roles);
    }).catch((err) => {
      res.json({ info: 'error during getRoles', error: err });
    });
  });
};

export default roleRoutes;
