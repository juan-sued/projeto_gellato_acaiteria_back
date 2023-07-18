import { ResponseAllUsersAndAdministrators, UpdateUserData, UsersBasic } from '@/interfaces/userInterfaces ';
import { addressesRepository, usersRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { addresses, users } from '@prisma/client';
import bcrypt from 'bcrypt';

async function getAllUsersAndAdministrators(): Promise<ResponseAllUsersAndAdministrators> {
  const users: UsersBasic[] = await usersRepository.getAllUsers();
  const administrators: UsersBasic[] = await usersRepository.getAllAdministrators();

  return {
    users: users,
    administrators: administrators,
  };
}

async function getUsersAndAdministratorsByName(name: string): Promise<ResponseAllUsersAndAdministrators> {
  const users: UsersBasic[] = await usersRepository.getUsersByFilterName(name);
  const administrators: UsersBasic[] = await usersRepository.getAdministratorsByFilterName(name);

  return {
    users: users,
    administrators: administrators,
  };
}

async function getUserOrAdministratorById(id: number): Promise<Omit<users, 'id' | 'password' | 'updatedAt'>> {
  const user: users = await usersRepository.getUserOrAdministratorById(id);

  return user;
}

async function updateUserService(id: number, updateUserData: UpdateUserData) {
  if (updateUserData.password) {
    const passwordCripted = await bcrypt.hash(updateUserData.password, 10);
    updateUserData.password = passwordCripted;
  }

  await usersRepository.updateUser(id, updateUserData);

  return;
}

async function deleteUserService(id: number) {
  if (!id) throw errorFactory.unprocessableEntity(['id inexistent']);
  await usersRepository.deleteUser(id);
}

function removeEmptyProperties<T>(obj: T): T {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      removeEmptyProperties(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    } else if (obj[key] === '') {
      delete obj[key];
    }
  }
  return obj;
}

export {
  getUserOrAdministratorById,
  getAllUsersAndAdministrators,
  getUsersAndAdministratorsByName,
  updateUserService,
  deleteUserService,
};
