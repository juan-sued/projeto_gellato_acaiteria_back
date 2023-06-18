import favoritedsService from '@/services/favoritedsServices/favoritedsService';
import { Request, Response } from 'express';

export async function getAllFavoritedsController(
  request: Request,
  response: Response
) {
  const { idUser } = response.locals;

  const favoritedsList = await favoritedsService.getFavoritedByIdService(
    idUser
  );

  response.status(200).send(favoritedsList);
}
