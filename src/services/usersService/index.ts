import { responseDataUser, ResponseUsers, UpdateUserData, UsersBasic } from '@/interfaces/userInterfaces ';
import { addressesRepository, usersRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import { addresses } from '@prisma/client';
import bcrypt from 'bcrypt';

async function getUsersService(name: string, id: number): Promise<ResponseUsers | responseDataUser> {
  const userList: UsersBasic[] = [];
  const administratorsList: UsersBasic[] = [];

  const usersListResponse: ResponseUsers = {
    users: userList,
    administrators: administratorsList,
  };

  const user: UsersBasic = {
    id: 1,
    name: 'name',
    phone: '12344545',
  };
  const addressesOfUser: addresses[] = [];
  const userAllData: responseDataUser = {
    user: user,
    addresses: addressesOfUser,
  };

  if (name) {
    const allUsers = await usersRepository.getUsersByFilterName(name);

    const allAdministrators = await usersRepository.getAdministratorsByFilterName(name);
    if (!allUsers && !allAdministrators) throw errorFactory.notFound('user');

    usersListResponse.administrators = allAdministrators;
  } else if (!!id) {
    const userOfResponse = await usersRepository.getUserById(id);
    if (!userOfResponse) throw errorFactory.notFound('user');
    userAllData.user = userOfResponse;

    const addresses = await addressesRepository.getAddressesByUser(id);

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

export { getUsersService, updateUserService, deleteUserService };
