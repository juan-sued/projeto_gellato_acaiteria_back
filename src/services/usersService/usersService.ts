import {
  Address,
  responseDataUser,
  ResponseUsers,
  Users
} from '../../interfaces/userInterfaces ';
import { usersRepository } from '../../repositories';
import { errorFactory } from '../../utils';

async function getUsersService(
  name: string | any,
  id: string
): Promise<ResponseUsers | responseDataUser> {
  const userList: Users[] = [];
  const administratorsList: Users[] = [];

  const usersListResponse: ResponseUsers = {
    users: userList,
    administrators: administratorsList
  };

  const user: Users = {};
  const addressesOfUser: Address[] = [];
  const userAllData: responseDataUser = {
    user: user,
    addresses: addressesOfUser
  };

  if (name) {
    const allUsers = await usersRepository.getUsersByFilterName(name);
    const allAdministrators = await usersRepository.getAdministratorsByFilterName(name);
    console.log(allUsers);
    if (!allUsers && !allAdministrators) throw errorFactory.notFound('user');

    usersListResponse.users = allUsers;
    usersListResponse.administrators = allAdministrators;
  } else if (!!id) {
    const userOfResponse = await usersRepository.getUserById(Number(id));
    if (!userOfResponse) throw errorFactory.notFound('user');
    userAllData.user = userOfResponse;

    const addresses = await usersRepository.getAddressesByUser(Number(id));

    userAllData.addresses = addresses;
    return userAllData;
  } else {
    const allUsers = await usersRepository.getAllUsers();
    const allAdministrators = await usersRepository.getAllAdministrators();

    if (!allUsers && !allAdministrators) throw errorFactory.notFound('user');

    usersListResponse.users = allUsers;
    usersListResponse.administrators = allAdministrators;
  }

  return usersListResponse;
}

export { getUsersService };
