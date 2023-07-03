import { insertTypeOfUser } from './../../repositories/users/typesOfUsersRepository';
import { typesOfUsersService } from '@/services';
import { Request, Response } from 'express';

export async function insertTypesOfUsers(req: Request, res: Response) {
  const { name, description, access }: insertTypeOfUser = req.body;
  const newTypesOfUsers = await typesOfUsersService.insertTypesOfUsers({
    name,
    description,
    access,
  });

  return res.status(201).send(newTypesOfUsers);
}

export async function getTypesOfUsers(req: Request, res: Response) {
  const result = await typesOfUsersService.getAllTypesOfUsers();

  res.status(200).send(result);
}
