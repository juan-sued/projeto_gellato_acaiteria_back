import dotenv from 'dotenv';

import { Request, Response, NextFunction } from 'express';
import * as usersRepository from '@/repositories/usersRepository';

import { errorFactory } from '@/utils/index';
import { decodedToken } from '@/services/authServices/jwtToken';

dotenv.config();

async function validateJwtTokenMiddleware(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.header('Authorization');
  if (!authHeader) throw errorFactory.unauthorized('authHeader');

  const token = authHeader.split(' ')[1];
  if (!token) throw errorFactory.unauthorized('token');
  const payload = await decodedToken(token);

  const user = await usersRepository.getUserById(payload.id);

  if (!user) throw errorFactory.notFound('usuário inexistente');

  response.locals.idUser = payload.id;

  next();
}
export { validateJwtTokenMiddleware };
