import config from 'config';
import { User } from '../../types/user';
import redisClient from '../../client/redisClient';

const cacheEnabled = config.get('cacheEnabled');

const toModel = (user: any): User => ({
  id: user.id || user._id || '',
  userName: user.userName || '',
  name: user.name || '',
  isAdmin: user.isAdmin || false,
  roles: user.roles || [],
});

const getUserList = async () => redisClient.lrangeAsync('users', 0, -1);
const getUserListSet = async () => redisClient.smembersAsync('users');
const getUsersKey = async () => redisClient.getAsync('users');

const getUsersFromCacheHset = async () => {
  const keys = await getUserListSet();
  if (keys.length === 0) {
    return [];
  }
  const promises = keys.map((k) => redisClient.hgetallAsync(k));
  const users = await Promise.all(promises);
  return users.map(toModel);
};

const getUsersFromCacheString = async () => {
  const json = await getUsersKey();
  if (!json) {
    return [];
  }
  return JSON.parse(json);
};

const getUsersFromCache = async () => getUsersFromCacheString();

const saveUsersToCacheSet = (users: User[]) => {
  const ids = users.map((u) => `user:${u.id}`);
  // @ts-ignores
  redisClient.saddAsync('users', ids);
  users.map((u) => ({ id: u.id.toString(), userName: u.userName, name: u.name })).forEach((u) => {
    // @ts-ignores
    redisClient.hmsetAsync(`user:${u.id}`, u);
  });
  return users;
};

const saveUsersToCacheList = (users: User[]) => {
  users.map((u) => ({ id: u.id.toString(), userName: u.userName, name: u.name })).forEach((u) => {
    // @ts-ignores
    redisClient.rpushAsync('users', `user:${u.id}`);
    // @ts-ignores
    redisClient.hmsetAsync(`user:${u.id}`, u);
  });
  return users;
};

const saveUsersToCacheString = (users: User[]) => {
  if (cacheEnabled) {
    redisClient.setAsync('users', JSON.stringify(users));
  }
  return users;
};

const saveUsersToCache = (users: User[]) => {
  if (cacheEnabled) {
    return saveUsersToCacheString(users);
  }
  return users;
};

// @ts-ignores
const clearCache = () => redisClient.delAsync('users');

export default {
  getUsersFromCache,
  saveUsersToCache,
  clearCache,
};
