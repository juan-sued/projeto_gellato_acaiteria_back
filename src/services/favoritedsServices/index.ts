import { favoritedsRepository } from '@/repositories';

async function getFavoritedByIdService(id: number) {
  const FavoritedsById = await favoritedsRepository.getFavoritedById(id);

  return FavoritedsById;
}

async function updateFavorited(productId: number, userId: number) {
  const isFavorited = await favoritedsRepository.getFavoritedByUserIdAndProductId(productId, userId);
  if (isFavorited) {
    await favoritedsRepository.deleteFavorited(productId, userId);
  } else {
    await favoritedsRepository.insertFavorited(productId, userId);
  }
}

export { getFavoritedByIdService, updateFavorited };
