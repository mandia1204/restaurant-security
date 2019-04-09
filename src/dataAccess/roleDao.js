import Role from '../models/roleModel';

const roleDao = () => {
  const getRoles = () => Role.find().exec();

  return {
    getRoles,
  };
};

export default roleDao;
