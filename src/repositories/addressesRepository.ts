import { addresses, Prisma, users } from '@prisma/client';
import { CreateAddressParams, UpdateAddressData } from 'src/interfaces/userInterfaces ';
import { createAddress } from 'src/schemas/addressSchema';
import { prisma } from '../databases/postgreSQL';
import { ISign } from '../interfaces/authInterfaces';

//=================== GET =====================//

function getAddressesByUser(id: number): Promise<addresses[]> {
  const params: Prisma.addressesFindManyArgs = {
    where: {
      userId: id
    }
  };

  return prisma.addresses.findMany(params);
}

function getAddressesById(id: number) {
  const params: Prisma.addressesFindUniqueArgs = {
    where: {
      id: id
    }
  };

  return prisma.addresses.findUnique(params);
}

//================= INSERT ===================//

async function insertAddress(id: number, newAddress: CreateAddressParams) {
  const result = await prisma.addresses.create({
    data: newAddress
  });
  if (!result) throw { type: 'error' };
  return result;
}

//============== UPDATE ==================//

async function updateAddress(idAddress: number, newAddress: UpdateAddressData) {
  const result = await prisma.addresses.update({
    where: { id: idAddress },
    data: newAddress
  });

  if (!result) throw { type: 'error' };
  return result;
}

export { insertAddress, getAddressesByUser, updateAddress, getAddressesById };
