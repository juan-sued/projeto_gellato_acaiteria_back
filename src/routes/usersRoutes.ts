import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { addressSchema } from '../schemas/addressSchema';
import {
  getUsersController,
  updateUserController,
  deleteUserController,
  insertAddressesController
} from '../controllers/usersController';
import validateJwtTokenMiddleware from '../middlewares/validateJwtTokenMiddleware';

const usersRouter = Router();

usersRouter
  .all('/*', validateJwtTokenMiddleware)
  .get('/', getUsersController)
  .get('/:id', getUsersController)
  .patch('/', updateUserController)
  .delete('/', deleteUserController)
  .post(
    '/addresses/',
    validateSchemaMiddleware(addressSchema),
    insertAddressesController
  );

export { usersRouter };
