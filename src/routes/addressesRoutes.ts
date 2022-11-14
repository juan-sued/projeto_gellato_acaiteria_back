import { Router } from 'express';
import { getAddressesController } from 'src/controllers/addressesController';

import validateJwtTokenMiddleware from '../middlewares/validateJwtTokenMiddleware';

const usersRouter = Router();

usersRouter.get('/users', validateJwtTokenMiddleware, getAddressesController);

// usersRouter.get('/users/:id', validateJwtTokenMiddleware, getUsersController);

// usersRouter.patch('/users', validateJwtTokenMiddleware, updateUserController);
// usersRouter.delete('/users', validateJwtTokenMiddleware, deleteUserController);

export { usersRouter };
