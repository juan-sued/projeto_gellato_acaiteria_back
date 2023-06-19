import {
  responseDataUser,
  ResponseUsers,
  UpdateAddressData,
  UpdateUserData,
  UsersBasic,
} from '@/interfaces/userInterfaces ';
import { addressesRepository, usersRepository } from '@/repositories';
import { errorFactory } from '@/utils';
import bcrypt from 'bcrypt';
import { addresses } from '@prisma/client';

async function createAddress(newAddress: Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>): Promise<addresses> {
  const result = await isDuplicateAddress(newAddress);

  if (result) throw errorFactory.conflict('address already exists');
  const createdAddress = await addressesRepository.insertAddress(newAddress);

  return createdAddress;
}

async function getAllAddresses(id: number): Promise<addresses[]> {
  const addresses = await addressesRepository.getAddressesByUser(id);
  if (!addresses) throw errorFactory.notFound('address');

  return addresses;
}

async function getAddressById(id: string): Promise<addresses> {
  const address: addresses = await addressesRepository.getAddressById(Number(id));
  if (!address) throw errorFactory.notFound('address');

  return address;
}

async function updateAddress(id: string, updateAddressData: UpdateAddressData) {
  if (
    !updateAddressData.cep ||
    !updateAddressData.complement ||
    !updateAddressData.neighborhood ||
    !updateAddressData.addressDetail ||
    !updateAddressData.number ||
    !updateAddressData.street ||
    !updateAddressData.state ||
    !id
  )
    throw errorFactory.unprocessableEntity(['email inexistent or', 'id inexistent or', 'password inexistent']);

  await addressesRepository.updateAddress(Number(id), updateAddressData);

  return;
}

// async function deleteAddress(id: string) {
//   if (!id) throw errorFactory.unprocessableEntity(['id inexistent']);
//   await addressesRepository.deleteAddress(Number(id));
// }
async function isDuplicateAddress(newAddress: Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>) {
  const addresses = await addressesRepository.getAddressesByUser(newAddress.userId);

  return addresses.some((address) => {
    return (
      address.street === newAddress.street &&
      address.number === newAddress.number &&
      address.city === newAddress.city &&
      address.state === newAddress.state &&
      address.neighborhood === newAddress.neighborhood &&
      address.cep === newAddress.cep
    );
  });
}
export { getAllAddresses, createAddress, getAddressById, updateAddress };
