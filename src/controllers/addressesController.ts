import { Request, Response } from 'express';
import { getAddressesService, updateUserService } from '../services/usersService';

export async function getAddressesController(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { id } = request.params;

  const users = await getAddressesService(name, id);
  response.status(200).send(users);
}

export async function updateUserController(request: Request, response: Response) {
  const { idUser } = response.locals;
  const updateUserData = request.body;
  console.log('aaa');
  await updateUserService(idUser, updateUserData);

  response.sendStatus(200);
}
