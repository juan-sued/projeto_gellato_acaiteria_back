import { Router } from 'express';
import { getUsersController, updateUserController, deleteUserController } from '@/controllers/users/usersController';
import { validateJwtTokenMiddleware } from '@/middlewares';

const usersRouter = Router();

usersRouter
  .all('*', validateJwtTokenMiddleware)
  .get('/', getUsersController)
  .get('/:id', getUsersController)
  .patch('/', updateUserController)
  .delete('/', deleteUserController);

export { usersRouter };
