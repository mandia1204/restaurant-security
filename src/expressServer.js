import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import Auth from './auth/auth';

const ExpressServer = () => {
  const getServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true,
    }));
    app.use(Auth().initialize());

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'));
    });

    app.get('/ping', (req, res) => {
      res.send('service ok!');
    });

    return app;
  };
  return {
    getServer,
  };
};

export default ExpressServer;
