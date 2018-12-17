import mongooseUtil from '../db/mongooseUtil';
import DebugNamespaces from '../util/debugNameSpaces';
import Logger from '../util/logger';

const logger = Logger(DebugNamespaces.http);
const commonHeaders = (app) => {
  const db = mongooseUtil();
  app.use((req, res, next) => {
    db.connect();
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    logger.info('%s %s %o', req.method, req.url, req.headers);
    next();
  });
};

export default commonHeaders;
