import { Request, Response } from 'express';
import { getUsersService } from '../services/usersService';
export async function getUsersController(request: Request, response: Response) {
  const { name } = request.query;
  const { id } = request.params;

  const users = await getUsersService(name, id);

  response.status(200).send(users);
}
