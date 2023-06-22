import { Request, Response } from 'express';
import { deleteUserService, getUsersService, updateUserService } from '@/services/usersService';

// Routes Post in AuthController

async function getUsersController(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { idParams } = response.locals;
  const users = await getUsersService(name, idParams);
  response.status(200).send(users);
}

async function updateUserController(request: Request, response: Response) {
  const { idUser } = response.locals;
  const updateUserData = request.body;
  await updateUserService(idUser, updateUserData);

  response.sendStatus(200);
}

async function deleteUserController(request: Request, response: Response) {
  const { idUser } = response.locals;

  await deleteUserService(idUser);

  response.sendStatus(200);
}

export { getUsersController, updateUserController, deleteUserController };
