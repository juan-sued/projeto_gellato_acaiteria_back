import { Router } from 'express';
import { getUsersController, updateUserController, deleteUserController } from '@/controllers/users/usersController';
import { validateJwtTokenMiddleware, validateIdParamsMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { userSchemas } from '@/schemas';

const usersRouter = Router();

usersRouter
  .all('*', validateJwtTokenMiddleware)
  .get('/', getUsersController)
  .get('/:id', validateIdParamsMiddleware, getUsersController)
  .patch('/', validateSchemaMiddleware(userSchemas.userSchema), updateUserController)
  .delete('/', deleteUserController);

export { usersRouter };
