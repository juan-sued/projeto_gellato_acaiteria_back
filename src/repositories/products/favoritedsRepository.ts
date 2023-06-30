import { prisma } from '@/config';

//=================== GET =====================//
function getFavoritedsById(id: number) {
  return prisma.favoriteds.findMany({
    where: { userId: id },
  });
}

export { getFavoritedsById };
