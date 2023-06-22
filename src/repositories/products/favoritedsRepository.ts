import { prisma } from '@/databases/postgreSQL';

//=================== GET =====================//
function getFavoritedsById(id: number) {
  return prisma.favoriteds.findMany({
    where: { userId: id }
  });
}

export { getFavoritedsById };
