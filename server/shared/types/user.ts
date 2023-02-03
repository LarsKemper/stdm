import { UserRoles } from '../enums/userRoles';

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
