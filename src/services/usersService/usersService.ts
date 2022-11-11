import {
  Address,
  responseDataUser,
  ResponseUsers,
  UpdateUserData,
  Users
} from '../../interfaces/userInterfaces ';
import { usersRepository } from '../../repositories';
import { errorFactory } from '../../utils';
import bcrypt from 'bcrypt';

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

async function updateUserService(id: string, updateUserData: UpdateUserData) {
  if (!updateUserData.email || !updateUserData.password || !id)
    throw errorFactory.unprocessableEntity([
      'email inexistent or',
      'id inexistent or',
      'password inexistent'
    ]);

  const user = await usersRepository.getUserByEmail(updateUserData.email);
  if (user) throw errorFactory.conflict('user existent');

  const passwordCripted = await bcrypt.hash(updateUserData.password, 10);
  updateUserData.password = passwordCripted;

  await usersRepository.updateUser(Number(id), updateUserData);

  return;
}

async function deleteUserService(id: string) {
  if (!id) throw errorFactory.unprocessableEntity(['id inexistent']);
  await usersRepository.deleteUser(Number(id));
}

export { getUsersService, updateUserService, deleteUserService };
