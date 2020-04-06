import RoleRepository from '../dataAccess/roleRepository';

const roleService = () => {
  const repo = RoleRepository();

  const toModel = (role) => ({
    id: role._id,
    roleName: role.roleName || '',
  });

  const getRoles = () => repo.getRoles()
    .then((roles) => roles.map(toModel));

  return {
    getRoles,
  };
};

export default roleService;
