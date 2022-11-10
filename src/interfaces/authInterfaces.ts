import { users } from '@prisma/client';

export interface ISign extends Omit<users, 'id' | 'phone' | 'cpf'> {
  confirmPassword?: string;
}
