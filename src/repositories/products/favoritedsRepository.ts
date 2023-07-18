import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

//=================== GET =====================//
function getFavoritedsByUserId(userId: number) {
  return prisma.favoriteds.findMany({
    where: { userId },
  });
}

function getFavoritedById(id: number) {
  return prisma.favoriteds.findUnique({
    where: {
      id,
    },
  });
}
function getFavoritedByUserIdAndProductId(productId: number, userId: number) {
  return prisma.favoriteds.findFirst({
    where: {
      productId,
      userId,
    },
  });
}

async function insertFavorited(productId: number, userId: number) {
  const favoritedCreated = await prisma.favoriteds.create({
    data: {
      productId,
      userId,
    },
  });

  return favoritedCreated;
}
async function deleteFavorited(productId: number, userId: number) {
  const productCreated = prisma.favoriteds.deleteMany({
    where: {
      productId,
      userId,
    },
  });

  return productCreated;
}

export { getFavoritedsByUserId, getFavoritedById, insertFavorited, deleteFavorited, getFavoritedByUserIdAndProductId };
