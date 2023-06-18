import { Request, Response } from 'express';
import addressesService from '@/services/addressesService/addressesService';

export async function getAddressesController(
  request: Request,
  response: Response
) {
  const { name } = request.query as Record<string, string>;
  const { id } = request.params;

  const users = await addressesService.getUsersService(name, id);
  response.status(200).send(users);
}

export async function updateUserController(
  request: Request,
  response: Response
) {
  const { idUser } = response.locals;
  const updateUserData = request.body;
  /// await updateUserService(idUser, updateUserData);

  response.sendStatus(200);
}
