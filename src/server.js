import promClient from 'prom-client';
import './setup';
import { initGlobalTracer } from 'opentracing';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import config from 'config';
import express from './expressServer';
import commonHeaders from './routes/commonHeaders';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import roleRoutes from './routes/roleRoutes';
import DebugNamespaces from './util/debugNameSpaces';
import Logger from './util/logger';
import initTracer from './tracing/tracer';
import tracingMiddleware from './tracing/tracing-middleware';

const SWAGGER_PATH = `${__dirname}/swagger.yaml`;

const logger = Logger(DebugNamespaces.server);
const app = express().getServer();
const { register } = promClient;

// jaeger
if (config.get('tracingEnabled')) {
  initGlobalTracer(initTracer('security-app'));
  app.use(tracingMiddleware());
}

// swagger
app.use('/.ambassador-internal/openapi-docs', swaggerUi.serve, swaggerUi.setup(yaml.load(SWAGGER_PATH)));

commonHeaders(app);
userRoutes(app);
tokenRoutes(app);
roleRoutes(app);

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
