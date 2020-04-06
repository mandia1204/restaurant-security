import { promisify } from 'util';
import config from 'config';
import redis from 'redis';
import Logger from '../util/logger';
import DebugNamespaces from '../util/debugNameSpaces';

const logger = Logger(DebugNamespaces.server);

const { host, port } = config.get('redis');
const redisOptions = { host, port };

const client = redis.createClient(redisOptions);

const lrangeAsync = promisify(client.lrange).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const rpushAsync = promisify(client.rpush).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);
const delAsync = promisify(client.del).bind(client);
const saddAsync = promisify(client.sadd).bind(client);
const smembersAsync = promisify(client.smembers).bind(client);
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

client.on('error', (error) => {
  logger.error(['Redis error', error]);
});

const asyncMethods = { getAsync, setAsync, lrangeAsync, hgetallAsync, rpushAsync, hmsetAsync, delAsync, saddAsync, smembersAsync, setAsync };

export default Object.assign(client, asyncMethods);
