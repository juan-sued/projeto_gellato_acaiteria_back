import { users } from '@prisma/client';

export interface Users extends Omit<users, 'isAdministrator' | 'password'> {
  isAdministrator?: boolean;
  password?: string;
}

export interface responseUsers {
  users: Users[];
  administrators: Users[];
}
