import User from '../models/userModel.js';

const userSevice = () => {

  const findUsers = (params, sort) => {
    let query =  User.find(params);
    if(sort) {
      query = query.sort(sort);
    }
    return query.exec();
  };

  const findUser = (params) => {
    return User.findOne(params).exec();
  };

  const saveUser = (user) => {
    const newUser = new User(user);
    return newUser.save();
  };

  return {
    findUsers,
    findUser,
    saveUser
  };
};

export default userSevice;
