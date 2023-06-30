import { NextFunction, Request, Response } from 'express';
import { errorFactory } from '@/utils';
import { usersRepository } from '@/repositories';

const validateConflictUsersMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { email } = request.body;

  if (!email) throw errorFactory.unprocessableEntity(['email inexistent']);

  const isRegisteredUsers = await usersRepository.getUserByEmail(email);

  if (isRegisteredUsers) throw errorFactory.conflict('User');

  response.locals.user = request.body;

  next();
};
const validateNotFoundUsersMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { idParams } = response.locals;

  const isRegisteredUsers = await usersRepository.getUserOrAdministratorById(idParams);

  if (!isRegisteredUsers) throw errorFactory.notFound('User');

  response.locals.user = isRegisteredUsers;
  console.log('aqui');
  next();
};

export { validateConflictUsersMiddleware, validateNotFoundUsersMiddleware };
