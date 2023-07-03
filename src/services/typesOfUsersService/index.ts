import { insertTypeOfUser } from './../../repositories/users/typesOfUsersRepository';
import { typesOfUsersRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { typesOfUsers } from '@prisma/client';

async function insertTypesOfUsers(newTypesOfUsers: insertTypeOfUser) {
  await typesOfUsersRepository.insertTypeOfUser(newTypesOfUsers);
}

async function getAllTypesOfUsers(): Promise<typesOfUsers[]> {
  const typesOfUsers = await typesOfUsersRepository.getAllTypeOfUsers();
  if (!typesOfUsers) throw errorFactory.notFound('typesOfUsers');

  return typesOfUsers;
}

async function getTypesOfUsersById(id: number): Promise<typesOfUsers> {
  const typesOfUsers: typesOfUsers = await typesOfUsersRepository.getTypeOfUserById(id);
  if (!typesOfUsers) throw errorFactory.notFound('typesOfUsers');

  return typesOfUsers;
}

async function deleteTypesOfUsers(id: number) {
  await typesOfUsersRepository.deleteTypeOfUser(id);
}

export { deleteTypesOfUsers, getTypesOfUsersById, getAllTypesOfUsers, insertTypesOfUsers };
