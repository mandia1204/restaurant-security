import config from 'config';
import repo from '../dataAccess/userRepository';
import userCache from './cache/userCache';
import { User } from '../types/user';

const userSevice = () => {
  const cacheEnabled = config.get('cacheEnabled');
  const userRepository = repo();

  const toModel = (user: any): User => ({
    id: user._id || '',
    userName: user.userName || '',
    name: user.name || '',
    isAdmin: user.isAdmin || false,
    roles: user.roles || [],
  });

  const findUsers = async (params: any, sort: any) => {
    if (cacheEnabled) {
      const users = await userCache.getUsersFromCache();
      if (users.length > 0) {
        return users;
      }
    }

    return userRepository.findUsers(params, sort)
      .then((users) => users.map(toModel))
      .then(userCache.saveUsersToCache);
  };

  const findUser = (params: any) => userRepository.findUser(params);

  const saveUser = (user: User) => userRepository.findUser({ userName: user.userName }).then((existingUser) => {
    if (existingUser) {
      throw new Error('User already exists');
    }
    return userRepository.saveUser(user).then((u: User) => toModel(u));
  });

  const clearCache = () => {
    if (cacheEnabled) {
      return userCache.clearCache();
    }
    return Promise.resolve(0);
  };

  const updateUser = (user: User) => userRepository.updateUser(user).then((u) => toModel(u));

  return {
    findUsers,
    findUser,
    saveUser,
    updateUser,
    clearCache,
  };
};

export default userSevice;
