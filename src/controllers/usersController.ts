import { Request, Response } from 'express';
import {
  deleteUserService,
  getUsersService,
  registerAddressService,
  updateUserService
} from '../services/usersService';

//================================== Users =================================//

export async function getUsersController(request: Request, response: Response) {
  const { name } = request.query as Record<string, string>;
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

export async function deleteUserController(request: Request, response: Response) {
  const { idUser } = response.locals;

  await deleteUserService(idUser);

  response.sendStatus(200);
}

//================================= Addresses =================================//

export async function insertAddressesController(request: Request, response: Response) {
  const { idUser } = response.locals;
  const newAddressData = request.body;

  await registerAddressService(idUser, newAddressData);

  response.sendStatus(200);
}
