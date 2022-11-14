import { addresses, users } from '@prisma/client';

//==================== user ==================

export type UsersBasic = Pick<users, 'id' | 'name' | 'phone'>;

export interface ResponseUsers {
  users: UsersBasic[];
  administrators: UsersBasic[];
}
export interface responseDataUser {
  user: UsersBasic;
  addresses: addresses[];
}

//================= update ====================

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

export type CreateAddressParams = Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>;
