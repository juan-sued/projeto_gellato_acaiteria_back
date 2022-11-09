import { users }from '@prisma/client'
import { ISign } from '../../interfaces/authInterfaces';
import { usersRepository } from '../../repositories/index';
import { errorFactory } from '../../utils';

import bcrypt from 'bcrypt'

export async function signUpService( newUser: ISign) {
const { password, confirmPassword } = newUser;

  const userRegistered: users | null = await usersRepository.getUserByEmail(newUser.email);
  if (userRegistered) throw errorFactory.conflict("There's already a user registered with this email.");
  
  if (confirmPassword !== password) throw errorFactory.conflict("The passwords don't match.");
  newUser.password = await bcrypt.hash(password, 10);
 
  await usersRepository.insertUser(newUser);
 
}
