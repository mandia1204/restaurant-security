import RoleDao from '../dataAccess/roleDao';

const roleService = () => {
  const roleDao = RoleDao();

  const toModel = (role) => ({
    id: role._id,
    roleName: role.roleName || '',
  });

  const getRoles = () => roleDao.getRoles()
    .then((roles) => roles.map(toModel));

  return {
    getRoles,
  };
};

export default roleService;
