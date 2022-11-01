import { Router } from 'express';
import {
  loginUserController,
  registerUserController
} from '../controllers/usersController.js';
import signInMiddleware from '../middleware/signInUserMiddleware.js';
import signUpMiddleware from '../middleware/signUpUserMiddleware.js';
import createJwtToken from '../middleware/utils/createJwtToken.js';

const router = Router();

router.post('/sign-up', signUpMiddleware, registerUserController);
router.post('/sign-in', signInMiddleware, createJwtToken, loginUserController);
export default router;
