import User from '../models/userModel';

const userDao = () => {
  const findUsers = (params, sort) => {
    let query = User.find(params);
    if (sort) {
      query = query.sort(sort);
    }
    return query.exec();
  };

  const findUser = params => User.findOne(params).exec();

  const saveUser = (user) => {
    const newUser = new User(user);
    return newUser.save();
  };

  const updateUser = user => User.findByIdAndUpdate(user._id, user, { new: true });

  return {
    findUsers,
    findUser,
    saveUser,
    updateUser,
  };
};

export default userDao;
