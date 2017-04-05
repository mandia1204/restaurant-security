import User from '../models/userModel.js';

const userSevice = () => {

  const find = (params, sort) => {
    let query =  User.find(params);
    if(sort) {
      query = query.sort(sort);
    }
    return query.exec();
  };

  const findOne = (params) => {
    return User.findOne(params).exec();
  };

  const save = (user) => {
    const newUser = new User(user);
    return newUser.save();
  };

  return {
    findUsers: find,
    findUser: findOne,
    saveUser: save
  };
};

export default userSevice;
