import { Request, Response } from 'express';
import { getUsersService } from '../services/usersService';
export async function getUsersController(request: Request, response: Response) {
  const { name } = request.query;

  const users = await getUsersService(name);

  response.status(200).send(users);
}
