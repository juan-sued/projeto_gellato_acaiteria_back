import { adresses, users } from '@prisma/client';

export interface Users {
  id?: number;
  name?: string;
  email?: string;
  phone?: string | null;
  cpf?: string | null;
  password?: string;
  isAdministrator?: boolean;
}

export interface ResponseUsers {
  users: Users[];
  administrators: Users[];
}

export interface Address
  extends Omit<adresses, 'id' | 'userId' | 'typeCepId' | 'neighborhoodsId'> {}

export interface responseDataUser {
  user: Users;
  addresses: Address[];
}
