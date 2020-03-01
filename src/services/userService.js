import repo from '../dataAccess/userRepository';

const userSevice = () => {
  const userRepository = repo();

  const toModel = (user) => ({
    id: user._id,
    userName: user.userName || '',
    name: user.name || '',
    isAdmin: user.isAdmin || false,
    roles: user.roles || [],
  });

  const findUsers = (params, sort) => userRepository.findUsers(params, sort)
    .then((users) => users.map(toModel));

  const findUser = (params) => userRepository.findUser(params);

  const saveUser = (user) => userRepository.findUser({ userName: user.userName }).then((existingUser) => {
    if (existingUser) {
      throw new Error('User already exists');
    }
    return userRepository.saveUser(user).then((u) => toModel(u));
  });

  const updateUser = (user) => userRepository.updateUser(user).then((u) => toModel(u));

  return {
    findUsers,
    findUser,
    saveUser,
    updateUser,
  };
};

export default userSevice;
