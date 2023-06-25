import { Prisma, users } from '@prisma/client';
import { prisma } from '@/databases/postgreSQL';
import { ISignUp } from '@/interfaces/authInterfaces';
import { UpdateUserData, UsersBasic } from '@/interfaces/userInterfaces ';

//=================== GET =====================//
function getUserByEmail(email: string) {
  const params: Prisma.usersFindUniqueArgs = {
    where: {
      email,
    },
  };

  return prisma.users.findUnique(params);
}

async function getUserOrAdministratorById(id: number): Promise<users> {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },

    include: {
      typeOfUser: true,
      addresses: true,
    },
  });

  delete user['password'];
  delete user['typeOfUserId'];

  return user;
}
async function getAllUsers(): Promise<UsersBasic[]> {
  const users = await prisma.users.findMany({
    where: {
      typeOfUserId: 0,
    },
    select: {
      id: true,
      name: true,
      phone: true,
    },
  });

  return users;
}

function getAllAdministrators(): Promise<UsersBasic[]> {
  const params: Prisma.usersFindManyArgs = {
    where: {
      typeOfUserId: 1,
    },
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
      typeOfUserId: 0,
    },
    skip: 0,
    take: undefined,
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
      typeOfUserId: 1,
    },
    select: {
      id: true,
      name: true,
      phone: true,
    },
    skip: 0,
    take: undefined,
  });
}

//================= INSERT ===================//

async function insertUser(newUser: ISignUp) {
  delete newUser.confirmPassword;

  const result = await prisma.users.create({ data: newUser });
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
  getUserOrAdministratorById,
  getAllUsers,
  getUsersByFilterName,
  getAllAdministrators,
  getAdministratorsByFilterName,
  updateUser,
  deleteUser,
};
