import express from './expressServer';
import commonHeaders from './routes/commonHeaders';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import DebugNamespaces from './util/debugNameSpaces';
import Logger from './util/logger';

const logger = Logger(DebugNamespaces.server);
const app = express().getServer();

commonHeaders(app);
userRoutes(app);
tokenRoutes(app);

logger.info('Starting security-app version 1.3');

const port = 3001;
app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(`Listening on port ${port}`);
  }
});
