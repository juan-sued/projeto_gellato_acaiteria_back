import { users } from '@prisma/client';
import { usersRepository } from '../../repositories';

async function getAllUsersService(): Promise<users[]> {
  const allUsersList: users[] = await usersRepository.getAllUsers();
  return allUsersList;
}

async function getUsersByFilterNameService(name: string): Promise<users[]> {
  const usersByFilterNameList: users[] = await usersRepository.getUsersByFilterName(name);
  return usersByFilterNameList;
}

export { getAllUsersService, getUsersByFilterNameService };
