import { addresses, Prisma, users } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { ISign } from '@/interfaces/authInterfaces';
import { UpdateAddressData, UpdateUserData, UsersBasic } from '@/interfaces/userInterfaces ';
import { errorFactory } from '@/utils';

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

function getAllAdministrators(): Promise<UsersBasic[]> {
  const params: Prisma.usersFindManyArgs = {
    where: { isAdministrator: true },
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

function getAdministratorsByFilterName(name: string): Promise<UsersBasic[]> {
  return prisma.users.findMany({
    where: {
      name: {
        startsWith: `${name}`,
        mode: 'insensitive',
      },
      isAdministrator: true,
    },
    select: {
      id: true,
      name: true,
      phone: true,
    },
    skip: 0,
    take: 5,
  });
}

//================= INSERT ===================//

async function insertUser(newUser: ISign) {
  delete newUser.confirmPassword;

  const result = await prisma.users.create({ data: newUser });
  if (!result) throw { type: 'error' };
  return result;
}

//================= UPDATE ===================//

async function updateUser(id: number, updateUserData: UpdateUserData) {
  const resultUsers = await prisma.users.update({
    where: { id: id },
    data: updateUserData,
  });

  if (!resultUsers) throw { type: 'error' };
}

async function deleteUser(id: number) {
  await prisma.users.delete({ where: { id: id } });
}

export {
  getUserByEmail,
  insertUser,
  getUserById,
  getAllUsers,
  getUsersByFilterName,
  getAllAdministrators,
  getAdministratorsByFilterName,
  updateUser,
  deleteUser,
};
