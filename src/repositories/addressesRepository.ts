import { addresses, Prisma, users } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { ISign } from '@/interfaces/authInterfaces';
import { UpdateAddressData, UpdateUserData, UsersBasic } from '@/interfaces/userInterfaces ';

//=================== GET =====================//
function getUserByEmail(email: string) {
  const params: Prisma.usersFindUniqueArgs = {
    where: {
      email,
    },
  };

  return prisma.users.findUnique(params);
}

function getUserById(id: number) {
  const params: Prisma.usersFindUniqueArgs = {
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true,
      createdAt: true,
      updatedAt: true,
      isAdministrator: true,
    },
  };
  return prisma.users.findUnique(params);
}

function getAddressesByUser(id: number): Promise<addresses[]> {
  const params: Prisma.addressesFindManyArgs = {
    where: {
      id,
    },
  };

  return prisma.addresses.findMany(params);
}

function getAllUsers(): Promise<UsersBasic[]> {
  const params: Prisma.usersFindManyArgs = {
    where: { isAdministrator: false },
    select: {
      id: true,
      name: true,
      phone: true,
    },
  };
  return prisma.users.findMany(params);
}

function getUsersByFilterName(name: string): Promise<UsersBasic[]> {
  const params: Prisma.usersFindManyArgs = {
    where: {
      name: {
        startsWith: `${name}`,
        mode: 'insensitive',
      },
      isAdministrator: false,
    },
    skip: 0,
    take: 5,
  };

  return prisma.users.findMany(params);
}

//================= INSERT ===================//

async function insertAddress(newAddress: Omit<addresses, 'id' | 'createdAt' | 'updatedAt'>) {
  return await prisma.addresses.create({
    data: {
      street: newAddress.street,
      number: newAddress.number,
      city: newAddress.city,
      state: newAddress.state,
      neighborhood: newAddress.neighborhood,
      cep: newAddress.cep,
      user: {
        connect: { id: newAddress.userId },
      },
    },
  });
}

//================= UPDATE ===================//

async function updateUser(id: number, updateUserData: UpdateUserData) {
  const resultUsers = await prisma.users.update({
    where: { id: id },
    data: updateUserData,
  });

  if (!resultUsers) throw { type: 'error' };
}

async function updateAddress(id: number, updateAddress: UpdateAddressData) {}

async function deleteUser(id: number) {
  await prisma.users.delete({ where: { id: id } });
}

export {
  getUserByEmail,
  insertAddress,
  getUserById,
  getAllUsers,
  getUsersByFilterName,
  getAddressesByUser,
  updateUser,
  updateAddress,
  deleteUser,
};
