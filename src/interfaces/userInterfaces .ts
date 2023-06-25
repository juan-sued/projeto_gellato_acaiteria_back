import { addresses, users } from '@prisma/client';

//==================== user ==================

export type UsersBasic = Pick<users, 'id' | 'name' | 'phone'>;

export interface ResponseAllUsersAndAdministrators {
  users: UsersBasic[];
  administrators: UsersBasic[];
}
export interface responseDataUser {
  user: UsersBasic | {};
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
  cep?: string;
  street?: string;
  city?: string;
  state?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
  addressDetail?: string;
}

export type CreateAddressParams = Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>;
