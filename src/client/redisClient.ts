import { promisify } from 'util';
import config from 'config';
import redis from 'redis';
import Logger from '../util/logger';
import DebugNamespaces from '../util/debugNameSpaces';

interface RedisClient {
    getAsync: (key: string) => Promise<string>;
    lrangeAsync: (key: string, start: number, stop: number) => Promise<string[]>;
    setAsync: (key: string, value: string) => Promise<any>;
    hgetallAsync: (key: string) => Promise<{[key:string] : string}>;
    rpushAsync: (key: string, value: string) => Promise<number>;
    hmsetAsync: (key: string, value: {[key:string] : string}) => Promise<"OK">;
    delAsync: (key: string) => Promise<number>;
    saddAsync: (key: string, values: string[]) => Promise<number>;
    smembersAsync: (key: string) => Promise<string[]>;
}

const logger = Logger(DebugNamespaces.server);
const cacheEnabled = config.get('cacheEnabled');

const createClient = (): RedisClient => {
  if (!cacheEnabled) {
    // return fake object
    return {
      getAsync: () => Promise.resolve(''),
      lrangeAsync: () => Promise.resolve([]),
      setAsync: () => Promise.resolve(''),
      hgetallAsync: () => Promise.resolve({}),
      rpushAsync: () => Promise.resolve(0),
      hmsetAsync: () => Promise.resolve('OK'),
      delAsync: () => Promise.resolve(0),
      saddAsync: () => Promise.resolve(0),
      smembersAsync: () => Promise.resolve([]),
    };
  }
  const { host, port } = config.get('redis');
  const redisOptions = { host, port };

  const client = redis.createClient(redisOptions);
  client.on('error', (error) => {
    logger.error(['Redis error', error]);
  });

  return {
    getAsync: promisify(client.get).bind(client),
    lrangeAsync: promisify(client.lrange).bind(client),
    setAsync: promisify(client.set).bind(client),
    hgetallAsync: promisify(client.hgetall).bind(client),
    rpushAsync: promisify(client.rpush).bind(client),
    // @ts-ignores
    hmsetAsync: promisify(client.hmset).bind(client),
    delAsync: promisify(client.del).bind(client),
    saddAsync: promisify(client.sadd).bind(client),
    smembersAsync: promisify(client.smembers).bind(client),
  };
};

const client = createClient();
export default client;
