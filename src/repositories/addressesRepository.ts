import { addresses, Prisma, users } from '@prisma/client';
import { CreateAddressParams } from 'src/interfaces/userInterfaces ';
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

//================= INSERT ===================//

async function insertAddress(id: number, newAddress: CreateAddressParams) {
  const result = await prisma.addresses.create({
    data: newAddress
  });
  if (!result) throw { type: 'error' };
  return result;
}

export { insertAddress, getAddressesByUser };
