import { users } from '@prisma/client';
import { Request, Response } from 'express';
import { UsersBasic } from 'src/interfaces/userInterfaces ';
import { ISign } from '../interfaces/authInterfaces';

import { signInService, signUpService } from '../services/authServices';

export async function registerUserController(request: Request, response: Response) {
  const newUser: ISign = request.body;
  await signUpService(newUser);

  response.sendStatus(201);
}

type LoginResponse = {
  user: {
    id: number;
    name: string;
  };
  token: string;
};

export async function loginUserController(request: Request, response: Response) {
  const user: ISign = request.body;
  const loginResponse: LoginResponse = await signInService(user);
  response.status(200).send(loginResponse);
}
