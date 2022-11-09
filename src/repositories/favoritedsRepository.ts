import { prisma } from '../databases/postgreSQL.js';

//=================== GET =====================//
function getFavoritedsById(id: number) {
  return prisma.favoriteds.findMany({
    where: { userId: id }
  });
}

export { getFavoritedsById };
