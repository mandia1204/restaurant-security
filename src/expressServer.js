import express from 'express';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
import Auth from './auth/auth.js'

const ExpressServer = () => {
  const _getServer = () =>{
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(Auth().initialize());

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname + '/index.html'));
    });
    
    return app;
  };
  return {
    getServer: _getServer
  }
};

export default ExpressServer;
