import { Router } from 'express';
import { registerUser } from '../controllers/usersController.js';
import signUpMiddleware from '../middleware/signUpUserMiddleware.js';

const router = Router();

router.post('/signup', signUpMiddleware, registerUser);

export default router;
