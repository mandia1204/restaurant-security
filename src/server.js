import promClient from 'prom-client';
import './setup';
import { initGlobalTracer } from 'opentracing';
import config from 'config';
import expressServer from './expressServer';
import commonHeaders from './routes/commonHeaders';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import roleRoutes from './routes/roleRoutes';
import swaggerRoutes from './routes/swaggerRoutes';
import DebugNamespaces from './util/debugNameSpaces';
import Logger from './util/logger';
import initTracer from './tracing/tracer';
import tracingMiddleware from './tracing/tracing-middleware';

const logger = Logger(DebugNamespaces.server);
const app = expressServer().getServer();
const { register } = promClient;

// jaeger
if (config.get('tracingEnabled')) {
  initGlobalTracer(initTracer('security-app'));
  app.use(tracingMiddleware());
}

commonHeaders(app);
userRoutes(app);
tokenRoutes(app);
roleRoutes(app);
swaggerRoutes(app);

app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});

logger.info('Starting security-app version 1.7');

const port = 3001;
app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(`Listening on port ${port}`);
  }
});
