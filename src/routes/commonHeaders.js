import mongooseUtil from '../db/mongooseUtil.js';
import Debug  from 'debug'; 
import DebugNamespaces from '../util/debugNameSpaces';

const debug = Debug(DebugNamespaces.http);

const commonHeaders = (app) => {
  const db = mongooseUtil();
  app.use((req, res, next) => {
    db.connect();
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    debug('%s %s %o', req.method, req.url, req.headers);
    next();
  });
};

export default commonHeaders;