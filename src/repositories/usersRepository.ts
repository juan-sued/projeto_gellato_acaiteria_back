import { Select } from '@mui/material';
import { prisma } from '../databases/postgreSQL';
import { ISign } from '../interfaces/authInterfaces';
import { Address, Users } from '../interfaces/userInterfaces ';

//=================== GET =====================//
function getUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email }
  });
}

function getUserById(id: number) {
  return prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true
    }
  });
}

function getAddressesByUser(id: number): Promise<Address[]> {
  return prisma.adresses.findMany({
    where: { userId: id },
    select: {
      cep: true,
      street: true,
      number: true,
      complement: true,
      id: true,
      typeCep: true,
      neighborhood: true
    }
  });
}

function getAllUsers(): Promise<Users[]> {
  return prisma.users.findMany({
    where: { isAdministrator: false },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true
    }
  });
}

function getAllAdministrators(): Promise<Users[]> {
  return prisma.users.findMany({
    where: { isAdministrator: true },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true
    }
  });
}

function getUsersByFilterName(name: string): Promise<Users[]> {
  return prisma.users.findMany({
    where: {
      name: {
        startsWith: `${name}`,
        mode: 'insensitive'
      },
      isAdministrator: false
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true
    },
    skip: 0,
    take: 5
  });
}

function getAdministratorsByFilterName(name: string): Promise<Users[]> {
  return prisma.users.findMany({
    where: {
      name: {
        startsWith: `${name}`,
        mode: 'insensitive'
      },
      isAdministrator: true
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true
    },
    skip: 0,
    take: 5
  });
}

//================= INSERT ===================//

async function insertUser(newUser: ISign) {
  delete newUser.confirmPassword;
  console.log(newUser);

  const result = await prisma.users.create({ data: newUser });

  if (!result) throw { type: 'error' };
}

export {
  getUserByEmail,
  insertUser,
  getUserById,
  getAllUsers,
  getUsersByFilterName,
  getAllAdministrators,
  getAdministratorsByFilterName,
  getAddressesByUser
};
