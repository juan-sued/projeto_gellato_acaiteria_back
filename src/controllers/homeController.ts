import { favoritedsServices } from '@/services';
import { Request, Response } from 'express';
export async function homeContentController(request: Request, response: Response) {
  const { idUser } = response.locals;

  const favoritedsList = await favoritedsServices.getFavoritedByIdService(idUser);

  response.status(200).send(favoritedsList);
}
