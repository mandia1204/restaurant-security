import express from './expressServer.js';
import commonHeaders from './routes/commonHeaders.js';
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import Debug  from 'debug'; 
import DebugNamespaces from './util/debugNameSpaces';

const debug = Debug(DebugNamespaces.server);
const app = express().getServer();

commonHeaders(app);
userRoutes(app);
tokenRoutes(app);

const port = 3001;
app.listen(port, (err) => {
  if (err) {
    debug(err);
  } else {
    debug(`Listening on port ${port}`);
  }
});
