import express from 'express';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
/* eslint-disable no-console */
const options = { promiseLibrary: bluebird };
mongoose.connect('mongodb://localhost/users', options);

const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

import userRoutes from './routes/userRoutes.js';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

userRoutes(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
