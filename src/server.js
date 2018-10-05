import Debug from 'debug';
import express from './expressServer';
import commonHeaders from './routes/commonHeaders';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import DebugNamespaces from './util/debugNameSpaces';

const debug = Debug(DebugNamespaces.server);
const app = express().getServer();

commonHeaders(app);
userRoutes(app);
tokenRoutes(app);

debug('Starting security-app version 1');

const port = 3001;
app.listen(port, (err) => {
  if (err) {
    debug(err);
  } else {
    debug(`Listening on port ${port}`);
  }
});
