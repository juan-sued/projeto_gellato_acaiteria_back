import dotenv from 'dotenv';

import { Request, Response, NextFunction } from 'express';
import * as usersRepository from '../repositories/usersRepository';

import { errorFactory } from '../utils/index';
import { decodedToken } from '../services/authServices/jwtToken';

dotenv.config();

async function validateJwtTokenMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token: string | undefined = request
    .header('Authorization')
    ?.replace('Bearer ', '');

  if (!token) throw errorFactory.unauthorized('token');

  const payload = await decodedToken(token);
  console.log('aqui');
  const user = await usersRepository.getUserById(payload.id);

  if (!user) throw errorFactory.notFound('usuário inexistente');

  response.locals.idUser = payload.id;

  next();
}
export default validateJwtTokenMiddleware;
