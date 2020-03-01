import User from '../models/userModel';

const userRepository = () => {
  const findUsers = (params, sort) => {
    let query = User.find(params);
    if (sort) {
      query = query.sort(sort);
    }
    return query.exec();
  };

  const findUser = (params) => User.findOne(params).exec();

  const saveUser = (user) => {
    const { _id, ...restUser } = user; //eslint-disable-line
    const newUser = new User(restUser);
    return newUser.save();
  };

  const updateUser = (user) => User.findByIdAndUpdate(user.id, user, { new: true });

  return {
    findUsers,
    findUser,
    saveUser,
    updateUser,
  };
};

export default userRepository;
