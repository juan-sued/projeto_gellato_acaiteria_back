import bcrypt from 'bcrypt';
import { ISign, ISignUp } from '@/interfaces/authInterfaces';
import { errorFactory } from '@/utils';
import { createToken } from './jwtToken';
import { typesOfUsers, users } from '@prisma/client';
import { usersRepository } from '@/repositories';

async function signInService(userLogin: ISign, userInDB: users, access: typesOfUsers) {
  const dbPassword = userInDB?.password ?? '';

  const isValidPassword = await bcrypt.compare(userLogin.password, dbPassword);

  if (!isValidPassword) throw errorFactory.forbidden();

  const userId = Number(userInDB?.id) ?? 0;
  const token = createToken(userId);

  return {
    user: {
      id: userInDB.id,
      name: userInDB.name,
      permissions: access,
      email: userInDB.email,
    },
    token: token,
  };
}

async function signUpService({ email, name, password, confirmPassword }: ISignUp): Promise<users> {
  password = await bcrypt.hash(password, 10);

  return await usersRepository.insertUser({ email, name, password, confirmPassword });
}

export { signInService, signUpService };
