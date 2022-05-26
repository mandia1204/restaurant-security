export interface Role {
  roleName: string;
}

export interface User {
  _id?: string;
  id: string;
  userName: string;
  name: string;
  isAdmin: boolean;
  roles: Role[];
}
