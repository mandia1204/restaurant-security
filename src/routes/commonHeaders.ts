import promClient from 'prom-client';
import { Express } from 'express';
import mongooseUtil from '../db/mongooseUtil';
import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

const logger = Logger(DebugNamespaces.http);

const counter = new promClient.Counter({
  name: 'security_app_http_requests_total',
  help: 'number of http requests',
  labelNames: ['method', 'handler'],
});
const commonHeaders = (app: Express) => {
  const db = mongooseUtil();
  app.use((req, res, next) => {
    db.connect();
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

    if (req.url !== '/metrics') {
      logger.info('%s %s %o', req.method, req.url, req.headers);
      counter.inc({ method: req.method, handler: req.url });
    }

    next();
  });
};

export default commonHeaders;
