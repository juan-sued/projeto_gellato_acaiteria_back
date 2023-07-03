import { typesOfUsers, Prisma } from '@prisma/client';
import { prisma } from '@/config';

//=================== GET =====================//

export type insertTypeOfUser = Omit<typesOfUsers, 'id' | 'createdAt' | 'updatedAt'>;

function getTypeOfUserById(id: number): Promise<typesOfUsers> {
  const params: Prisma.typesOfUsersFindUniqueArgs = {
    where: {
      id,
    },
  };

  return prisma.typesOfUsers.findUnique(params);
}

function getAllTypeOfUsers() {
  const params: Prisma.typesOfUsersArgs = {};

  return prisma.typesOfUsers.findMany(params);
}
//================= INSERT ===================//

async function insertTypeOfUser(newTypeOfUser: insertTypeOfUser) {
  return await prisma.typesOfUsers.create({
    data: newTypeOfUser,
  });
}

//================= UPDATE ===================//

async function deleteTypeOfUser(id: number) {
  console.log(id);
  const deleted = await prisma.typesOfUsers.delete({ where: { id: id } });

  return deleted;
}

export { insertTypeOfUser, getTypeOfUserById, deleteTypeOfUser, getAllTypeOfUsers };
