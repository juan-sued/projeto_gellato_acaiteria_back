import { Router } from 'express';
import {
  loginUserController,
  registerUserController
} from '../controllers/usersController.js';


import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { authSchemas } from '../schemas/index.js';


export const authRouter = Router();

authRouter.post('/sign-up',validateSchemaMiddleware(authSchemas.signUpSchema) , registerUserController);
authRouter.post('/sign-in',validateSchemaMiddleware(authSchemas.signInSchema) ,  loginUserController);

