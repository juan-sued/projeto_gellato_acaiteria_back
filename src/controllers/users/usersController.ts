import { Request, Response } from 'express';
import { deleteUserService, updateUserService } from '@/services/usersService';
import { ResponseAllUsersAndAdministrators } from '@/interfaces/userInterfaces ';
import { usersService } from '@/services';
import { users } from '@prisma/client';
import { errorFactory } from '@/utils';

// Routes Post in AuthController

async function getUsersController(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
  const { idParams } = response.locals;
  let result: ResponseAllUsersAndAdministrators | Omit<users, 'id' | 'password' | 'updatedAt'>;

  if (name) result = await usersService.getUsersAndAdministratorsByName(name);

  if (idParams) result = await usersService.getUserOrAdministratorById(idParams);

  if (!name && !idParams) result = await usersService.getAllUsersAndAdministrators();

  if (!result) throw errorFactory.notFound('user(s)');

  response.status(200).send(result);
}

async function updateUserController(request: Request, response: Response) {
  const { idUser } = response.locals;
  const updateUserData = request.body;
  console.log(idUser, updateUserData);
  await updateUserService(idUser, updateUserData);

  response.sendStatus(200);
}

async function deleteUserController(request: Request, response: Response) {
  const { idUser } = response.locals;

  await deleteUserService(idUser);

  response.sendStatus(200);
}

export { getUsersController, updateUserController, deleteUserController };
