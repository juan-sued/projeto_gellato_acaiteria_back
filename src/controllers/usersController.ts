import { Request, Response } from 'express';
import { getUsersService, updateUserService } from '../services/usersService';

export async function getUsersController(request: Request, response: Response) {
  const { name } = request.query;
  const { id } = request.params;

  const users = await getUsersService(name, id);
  response.status(200).send(users);
}

export async function updateUserController(request: Request, response: Response) {
  const { idUser } = response.locals;
  const updateUserData = request.body;

  await updateUserService(idUser, updateUserData);

  response.sendStatus(200);
}
