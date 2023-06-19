import { homeRepository } from '../../repositories';

async function getHomeContent() {
  const FavoritedsById = await homeRepository.getHomeContent();
  return FavoritedsById;
}

export { getHomeContent };
