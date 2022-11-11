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

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  isAdministrator?: boolean;
  password?: string;
}
export interface UpdateAddressData {
  id?: number;
  street?: string;
  number?: number;
  complement?: string;
  typeCep?: string;
  neighborhood?: string;
  cep?: string;
  typeCepId?: number;
  neighborhoodsId?: number;
}
