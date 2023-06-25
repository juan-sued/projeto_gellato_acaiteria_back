import { Router } from 'express';

import { loginUserController, registerUserController } from '@/controllers/auth/authController';
import { validateNotFoundEmailMiddleware, validateSchemaMiddleware } from '@/middlewares';
import { authSchemas } from '@/schemas';
import { validateConflictUsersMiddleware } from '@/middlewares/users';

export const authRouter = Router();

authRouter
  .post(
    '/sign-up',
    validateSchemaMiddleware(authSchemas.signUpSchema),
    validateConflictUsersMiddleware,
    registerUserController,
  )
  .post(
    '/sign-in',
    validateSchemaMiddleware(authSchemas.signInSchema),
    validateNotFoundEmailMiddleware,
    loginUserController,
  );
