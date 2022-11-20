import {
  CreateAddressParams,
  responseDataUser,
  ResponseUsers,
  UpdateAddressData,
  UpdateUserData,
  UsersBasic
} from '../../interfaces/userInterfaces ';
import { usersRepository, addressesRepository } from '../../repositories';
import { errorFactory, prismaUtils } from '../../utils';
import bcrypt from 'bcrypt';
import { addresses } from '@prisma/client';

async function getUsersService(
  name: string,
  id: string
): Promise<ResponseUsers | responseDataUser> {
  const userList: UsersBasic[] = [];
  const administratorsList: UsersBasic[] = [];
  const usersListResponse: ResponseUsers = {
    users: userList,
    administrators: administratorsList
  };

  const user: UsersBasic = {
    id: 0,
    name: 'modelo',
    phone: 'modelo'
  };
  const addressesOfUser: addresses[] = [];
  const userAllData: responseDataUser = {
    user: user,
    addresses: addressesOfUser
  };

  if (name) {
    const allUsers = await usersRepository.getUsersByFilterName(name);
    const allAdministrators = await usersRepository.getAdministratorsByFilterName(name);
    if (!allUsers && !allAdministrators) throw errorFactory.notFound('user');
    usersListResponse.administrators = allAdministrators;
    usersListResponse.users = allUsers;
  } else if (!!id) {
    const userOfResponse = await usersRepository.getUserById(Number(id));
    if (!userOfResponse) throw errorFactory.notFound('user');
    userAllData.user = userOfResponse;

    const addresses = await addressesRepository.getAddressesByUser(Number(id));

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
  const dataClean: UpdateUserData = prismaUtils.excludeEmpty(
    updateUserData,
    'name',
    'email',
    'phone',
    'cpf',
    'isAdministrator',
    'password'
  );

  if (dataClean.email) {
    const user = await usersRepository.getUserByEmail(dataClean.email);
    if (user) throw errorFactory.unprocessableEntity(['email já cadastrado']);
  }

  if (dataClean.password) {
    const passwordCripted = await bcrypt.hash(dataClean.password, 10);
    dataClean.password = passwordCripted;
  }

  await usersRepository.updateUser(Number(id), dataClean);

  return;
}

async function deleteUserService(id: string) {
  if (!id) throw errorFactory.unprocessableEntity(['id inexistent']);
  await usersRepository.deleteUser(Number(id));
}

//====================== Addresses =========================//

async function registerAddressService(id: number, newAddressData: CreateAddressParams) {
  const data = {
    userId: id,
    number: Number(newAddressData.number),
    cep: newAddressData.cep,
    street: newAddressData.street,
    city: newAddressData.city,
    state: newAddressData.state,
    neighborhood: newAddressData.neighborhood,
    addressDetail: newAddressData.addressDetail
  };

  await addressesRepository.insertAddress(id, data);
}

async function updateAddressService(
  idAddress: string,
  idUser: number,
  newAddressData: UpdateAddressData
) {
  const address = await addressesRepository.getAddressesByUser(idUser);

  if (address.length === (undefined || 0)) throw errorFactory.notFound('endereço');

  const addressOfId = address.filter(address => address.id === Number(idAddress));

  if (!addressOfId) throw errorFactory.notFound('endereço id');

  const dataClean: UpdateAddressData = prismaUtils.excludeEmpty(
    newAddressData,
    'number',
    'cep',
    'street',
    'city',
    'state',
    'neighborhood',
    'addressDetail'
  );

  await addressesRepository.updateAddress(Number(idAddress), dataClean);
}

export {
  getUsersService,
  updateUserService,
  deleteUserService,
  updateAddressService,
  registerAddressService
};
