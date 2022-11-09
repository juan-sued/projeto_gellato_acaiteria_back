import { Request, Response } from 'express';
import { ISign } from '../interfaces/authInterfaces';

import signInService from '../services/authServices/signInService';
import { signUpService } from '../services/authServices/signUpService';

export async function registerUserController(request :Request, response:Response) {

  const newUser: ISign = request.body;

    await signUpService(newUser)   
   
    response.sendStatus(201)
  }

export async function loginUserController(request: Request, response: Response) {
  const user: ISign = request.body;
  const token: string = await signInService(user);
  response.status(200).send(token);

}
