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
  const result = await verifyExistingAddress(newAddress);

  if (result) throw errorFactory.conflict('address already exists');
  const createdAddress = await addressesRepository.insertAddress(newAddress);

  return createdAddress;
}

async function getAllAddresses(id: number): Promise<addresses[]> {
  const addresses = await addressesRepository.getAddressesByUser(id);
  if (!addresses) throw errorFactory.notFound('address');

  return addresses;
}

async function getAddressById(id: number): Promise<addresses> {
  const address: addresses = await addressesRepository.getAddressById(id);
  if (!address) throw errorFactory.notFound('address');

  return address;
}

async function updateAddress(id: number, updateAddressData: Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>) {
  const result = await verifyExistingAddress(updateAddressData);
  if (!result) throw new Error('Endereço não encontrado');

  const updatedAddress = await addressesRepository.updateAddress(id, updateAddressData);

  return updateAddress;
}

async function deleteAddress(id: number) {
  const addressDeleted = await addressesRepository.deleteAddress(id);

  if (!addressDeleted) throw new Error('Erro ao deletar');
}
async function verifyExistingAddress(newAddress: Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>) {
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
export { getAllAddresses, createAddress, getAddressById, updateAddress, deleteAddress };
