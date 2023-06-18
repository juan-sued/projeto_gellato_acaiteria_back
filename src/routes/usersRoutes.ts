import { Router } from 'express';
import {
  getUsersController,
  updateUserController,
  deleteUserController
} from '@/controllers/usersController';
import validateJwtTokenMiddleware from '@/middlewares/validateJwtTokenMiddleware';

const usersRouter = Router();

usersRouter.get('/users', validateJwtTokenMiddleware, getUsersController);
usersRouter.get('/users/:id', validateJwtTokenMiddleware, getUsersController);

usersRouter.patch('/users', validateJwtTokenMiddleware, updateUserController);
usersRouter.delete('/users', validateJwtTokenMiddleware, deleteUserController);

export { usersRouter };
