import { prisma } from '../databases/postgreSQL';
import { ISign } from '../interfaces/authInterfaces';
import {
  Address,
  UpdateAddressData,
  UpdateUserData,
  Users
} from '../interfaces/userInterfaces ';
import { errorFactory } from '../utils';

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

  const result = await prisma.users.create({ data: newUser });
  if (!result) throw { type: 'error' };
  return result;
}

//================= UPDATE ===================//

async function updateUser(id: number, updateUserData: UpdateUserData) {
  const resultUsers = await prisma.users.update({
    where: { id: id },
    data: updateUserData
  });

  if (!resultUsers) throw { type: 'error' };
}

async function updateAddress(id: number, updateAddress: UpdateAddressData) {
  const resultTypeCep = await prisma.typesCep.findMany();

  if (!resultTypeCep) throw errorFactory.notFound('type cep');

  const resultTypeCepFilterById = resultTypeCep.find(
    typeCepName => typeCepName.name === updateAddress.typeCep
  );

  if (resultTypeCepFilterById) {
    updateAddress.typeCepId = resultTypeCepFilterById.id;
    delete updateAddress.typeCep;
  } else {
    insertTypeCep(updateAddress.typeCep);

    const id: number = resultTypeCep[resultTypeCep.length - 1].id + 1;

    updateAddress.typeCepId = id;
  }

  const resultNeighborhoods = await prisma.neighborhoods.findMany({
    include: {
      city: { select: { name: true } }
    }
  });

  if (!resultNeighborhoods) throw errorFactory.notFound('neighborhoods');

  const resultNeighborhoodsFilterById = resultNeighborhoods.find(
    neighborhoodsName => neighborhoodsName.name === updateAddress.neighborhood
  );
  if (resultNeighborhoodsFilterById) {
    updateAddress.neighborhoodsId = resultNeighborhoodsFilterById.id;
    delete updateAddress.neighborhood;
  } else {
    insertNeighborhoods(updateAddress.neighborhood);
    const id: number = resultNeighborhoods[resultNeighborhoods.length - 1].id + 1;

    updateAddress.neighborhoodsId = id;
  }

  // console.log('aqui', updateAddress);
  // const resultAddress = await prisma.adresses.update({
  //   where: { id: id },
  //   data: updateAddress
  // });
  // if (!resultAddress) throw { type: 'error' };
}

async function insertTypeCep(typeCep: string | undefined) {
  if (typeof typeCep === 'string')
    await prisma.typesCep.create({
      data: {
        name: typeCep
      }
    });
}

async function insertNeighborhoods(neighborhood: string | undefined) {
  if (typeof neighborhood === 'string')
    await prisma.neighborhoods.create({
      data: {
        name: neighborhood,
        cityId: 3
      }
    });
}

export {
  getUserByEmail,
  insertUser,
  getUserById,
  getAllUsers,
  getUsersByFilterName,
  getAllAdministrators,
  getAdministratorsByFilterName,
  getAddressesByUser,
  updateUser,
  updateAddress
};
