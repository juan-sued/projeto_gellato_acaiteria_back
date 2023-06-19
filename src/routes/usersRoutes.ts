import { Router } from 'express';
import { getUsersController, updateUserController, deleteUserController } from '@/controllers/usersController';
import validateJwtTokenMiddleware from '@/middlewares/validateJwtTokenMiddleware';
import { getAddresses, insertAddress } from '@/controllers/addressesController';

const usersRouter = Router();

usersRouter
  .all('*', validateJwtTokenMiddleware)
  .get('/', getUsersController)
  .get('/:id', getUsersController)
  .patch('/', updateUserController)
  .delete('/', deleteUserController);

export { usersRouter };
