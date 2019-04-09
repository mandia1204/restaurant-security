import promClient from 'prom-client';
import express from './expressServer';
import commonHeaders from './routes/commonHeaders';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import roleRoutes from './routes/roleRoutes';
import DebugNamespaces from './util/debugNameSpaces';
import Logger from './util/logger';

const logger = Logger(DebugNamespaces.server);
const app = express().getServer();
const { register } = promClient;

commonHeaders(app);
userRoutes(app);
tokenRoutes(app);
roleRoutes(app);

app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});

logger.info('Starting security-app version 1.3');

const port = 3001;
app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(`Listening on port ${port}`);
  }
});
