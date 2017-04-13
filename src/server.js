import express from 'express';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import getConnectionString from './db/connectionString.js';
import mongooseOptions from './db/mongooseOptions.js';
import connectionEvents from './db/connectionEvents.js';
import Auth from './auth/auth.js'

const connString = getConnectionString();
connectionEvents(mongoose);
mongoose.connect(connString, mongooseOptions);

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
