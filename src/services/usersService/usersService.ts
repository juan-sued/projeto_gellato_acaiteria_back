import { responseUsers, Users } from '../../interfaces/userInterfaces ';
import { usersRepository } from '../../repositories';

async function getUsersService(name: string | any): Promise<responseUsers> {
  const userList: Users[] = [];
  const administratorsList: Users[] = [];

  const usersListResponse: responseUsers = {
    users: userList,
    administrators: administratorsList
  };

  if (typeof name === 'string') {
    usersListResponse.users = await usersRepository.getUsersByFilterName(name);
    usersListResponse.administrators =
      await usersRepository.getAdministratorsByFilterName(name);
  } else {
    usersListResponse.users = await usersRepository.getAllUsers();
    usersListResponse.administrators = await usersRepository.getAllAdministrators();
  }

  return usersListResponse;
}

export { getUsersService };
