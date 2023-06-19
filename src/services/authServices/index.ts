import bcrypt from 'bcrypt';
import { ISign } from '@/interfaces/authInterfaces';
import { usersRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { createToken } from './jwtToken';
import { users } from '@prisma/client';

async function signInService(user: ISign) {
  const userRegistered = await usersRepository.getUserByEmail(user.email);
  if (!userRegistered) throw errorFactory.notFound('user');

  const dbPassword = userRegistered?.password ?? '';
  const isValidPassword = await bcrypt.compare(user.password, dbPassword);

  if (!isValidPassword) throw errorFactory.forbidden();

  const userId = Number(userRegistered?.id) ?? 0;
  const token = createToken(userId);

  return {
    user: {
      id: userRegistered.id,
      name: userRegistered.name,
    },
    token: token,
  };
}

async function signUpService(newUser: ISign) {
  const { password, confirmPassword } = newUser;

  const userRegistered: users | null = await usersRepository.getUserByEmail(newUser.email);
  if (userRegistered) throw errorFactory.conflict("There's already a user registered with this email.");

  if (confirmPassword !== password) throw errorFactory.conflict("The passwords don't match.");
  newUser.password = await bcrypt.hash(password, 10);

  await usersRepository.insertUser(newUser);
}

export { signInService, signUpService };
