import UserDao from '../dataAccess/userDao';

const userSevice = () => {
  const userDao = UserDao();

  const toModel = user => ({
    id: user._id,
    userName: user.userName || '',
    name: user.name || '',
    isAdmin: user.isAdmin || false,
    roles: user.roles || [],
  });

  const findUsers = (params, sort) => userDao.findUsers(params, sort)
    .then(users => users.map(toModel));

  const findUser = params => userDao.findUser(params);

  const saveUser = user => userDao.saveUser(user).then(u => toModel(u));

  const updateUser = user => userDao.updateUser(user).then(u => toModel(u));

  return {
    findUsers,
    findUser,
    saveUser,
    updateUser,
  };
};

export default userSevice;
