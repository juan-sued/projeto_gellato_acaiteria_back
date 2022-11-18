import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { addressSchema } from '../schemas/addressSchema';
import {
  getUsersController,
  updateUserController,
  deleteUserController,
  insertAddressesController,
  updateAddressesController
} from '../controllers/usersController';
import validateJwtTokenMiddleware from '../middlewares/validateJwtTokenMiddleware';
import { addressSchemas } from '../schemas';

const usersRouter = Router();

usersRouter
  .all('/*', validateJwtTokenMiddleware)
  .get('/', getUsersController)
  .get('/:id', getUsersController)
  .patch('/', updateUserController)
  .delete('/', deleteUserController)
  .post('/addresses/', validateSchemaMiddleware(addressSchema), insertAddressesController)
  .patch(
    '/addresses/:idAddress',
    validateSchemaMiddleware(addressSchemas.updateAddressSchema),
    updateAddressesController
  );

export { usersRouter };
