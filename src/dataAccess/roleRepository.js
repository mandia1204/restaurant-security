import Role from '../models/roleModel';

const roleRepository = () => {
  const getRoles = () => Role.find().exec();

  return {
    getRoles,
  };
};

export default roleRepository;
