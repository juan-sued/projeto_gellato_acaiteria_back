import { Request, Response } from 'express';

import { signInService, signUpService } from '@/services/authServices';
import { ISign, ISignUp } from '@/interfaces/authInterfaces';

export async function registerUserController(request: Request, response: Response) {
  const newUser: ISignUp = request.body;
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
  const userLogin: ISign = request.body;
  const { userInDB } = response.locals;
  const access = userInDB.typeOfUser;

  const loginResponse: LoginResponse = await signInService(userLogin, userInDB, access);
  response.status(200).send(loginResponse);
}
