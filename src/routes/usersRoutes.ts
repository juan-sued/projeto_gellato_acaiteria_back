import { Router } from 'express';
import { getUsersController } from '../controllers/usersController';
import validateJwtTokenMiddleware from '../middlewares/validateJwtTokenMiddleware';

const usersRouter = Router();

usersRouter.get('/users', validateJwtTokenMiddleware, getUsersController);
usersRouter.get('/users/:id', validateJwtTokenMiddleware, getUsersController);

export { usersRouter };
