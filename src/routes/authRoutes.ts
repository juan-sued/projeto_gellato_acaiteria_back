import { Router } from 'express';
import {
  loginUserController,
  registerUserController
} from '../controllers/authController';

import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { authSchemas } from '../schemas/index';

export const authRouter = Router();

authRouter.post('/sign-up',validateSchemaMiddleware(authSchemas.signUpSchema) , registerUserController);
authRouter.post('/sign-in',validateSchemaMiddleware(authSchemas.signInSchema) ,  loginUserController);

