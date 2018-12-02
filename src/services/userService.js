import UserDao from '../dataAccess/userDao';

const userSevice = () => {
  const userDao = UserDao();

  const findUsers = (params, sort) => userDao.findUsers(params, sort);

  const findUser = params => userDao.findUser(params);

  const saveUser = user => userDao.saveUser(user);

  return {
    findUsers,
    findUser,
    saveUser,
  };
};

export default userSevice;
