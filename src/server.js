import express from 'express';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import Auth from './auth/auth.js'
import getConnectionString from './connectionString.js';

const options = { promiseLibrary: bluebird };
mongoose.connect(getConnectionString(), options);

const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(Auth().initialize());

import commonHeaders from './routes/commonHeaders.js';
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js'

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

commonHeaders(app);
userRoutes(app);
tokenRoutes(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    //open(`http://localhost:${port}`);
  }
});
