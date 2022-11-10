import { users } from '@prisma/client';
import { prisma } from '../databases/postgreSQL';
import { ISign } from '../interfaces/authInterfaces';

//=================== GET =====================//
function getUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email }
  });
}
function getUserById(id: number) {
  return prisma.users.findFirst({
    where: { id }
  });
}

function getAllUsers(): Promise<users[]> {
  return prisma.users.findMany();
}

function getUsersByFilterName(name: string): Promise<users[]> {
  return prisma.users.findMany({
    where: {
      name: {
        startsWith: `${name}`,
        mode: 'insensitive'
      }
    }
  });
}

//================= INSERT ===================//

async function insertUser(newUser: ISign) {
  delete newUser.confirmPassword;

  const result = await prisma.users.create({ data: newUser });

  if (!result) throw { type: 'error' };
}

export { getUserByEmail, insertUser, getUserById, getAllUsers, getUsersByFilterName };
