import UserDao from '../dataAccess/userDao';

const userSevice = () => {
  const userDao = UserDao();

  const toModel = user => ({
    id: user._id,
    userName: user.userName || '',
    name: user.name || '',
    roles: user.roles || [],
  });

  const findUsers = (params, sort) => userDao.findUsers(params, sort)
    .then(users => users.map(toModel));

  const findUser = params => userDao.findUser(params);

  const saveUser = user => userDao.saveUser(user);

  const updateUser = user => userDao.updateUser(user);

  return {
    findUsers,
    findUser,
    saveUser,
    updateUser,
  };
};

export default userSevice;
