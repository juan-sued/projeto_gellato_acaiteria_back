import { validateIdParamsMiddleware } from '@/middlewares/shared';
import { Router } from 'express';

import { validateJwtTokenMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { typesOfUsersSchemas } from '@/schemas';
import { getTypesOfUsers, insertTypesOfUsers } from '@/controllers/users/typesOfUsersController';

const typesOfUsersRouter = Router();

typesOfUsersRouter
  .get('/', getTypesOfUsers)
  .all('*', validateJwtTokenMiddleware)
  .post('/', validateSchemaMiddleware(typesOfUsersSchemas.postTypeOfUserSchema), insertTypesOfUsers);

export { typesOfUsersRouter };
