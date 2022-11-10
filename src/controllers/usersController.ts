import { Request, Response } from 'express';
import {
  getAllUsersService,
  getUsersByFilterNameService
} from '../services/usersService';
import { users } from '@prisma/client';
export async function getUsersController(request: Request, response: Response) {
  const { name } = request.query;

  let users: users[] = [];

  if (typeof name === 'string') users = await getUsersByFilterNameService(name);
  else users = await getAllUsersService();

  response.status(200).send(users);
}
