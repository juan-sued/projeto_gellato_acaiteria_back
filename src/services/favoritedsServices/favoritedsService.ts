import { favoritedsRepository } from '@/repositories';

async function getFavoritedByIdService(userId: number) {
  const FavoritedsById = await favoritedsRepository.getFavoritedsById(userId);

  return FavoritedsById;
}

const favoritedsService = {
  getFavoritedByIdService
};

export default favoritedsService;
