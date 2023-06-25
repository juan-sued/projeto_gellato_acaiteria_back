import { users } from '@prisma/client';

export interface ISign extends Pick<users, 'email' | 'password'> {
  confirmPassword?: string;
}

export interface ISignUp extends Pick<users, 'name' | 'email' | 'password'> {
  confirmPassword?: string;
}
