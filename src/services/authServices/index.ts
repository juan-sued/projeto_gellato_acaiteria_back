import bcrypt from 'bcrypt';
import { ISign, ISignUp } from '@/interfaces/authInterfaces';
import { usersRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { createToken } from './jwtToken';
import { users } from '@prisma/client';

async function signInService(userLogin: ISign, userInDB: users) {
  const dbPassword = userInDB?.password ?? '';

  const isValidPassword = await bcrypt.compare(userLogin.password, dbPassword);

  if (!isValidPassword) throw errorFactory.forbidden();

  const userId = Number(userInDB?.id) ?? 0;
  const token = createToken(userId);

  return {
    user: {
      id: userInDB.id,
      name: userInDB.name,
    },
    token: token,
  };
}

async function signUpService(newUser: ISignUp) {
  const { password } = newUser;

  newUser.password = await bcrypt.hash(password, 10);

  await usersRepository.insertUser(newUser);
}

export { signInService, signUpService };
