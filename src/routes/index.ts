import { Router } from 'express';
import { authRouter } from './authRoutes';
import { favoritedsRouter } from './favoritedsRoutes';
import { homeContentRouter } from './homeRoutes';
import { usersRouter } from './usersRoutes';

const router = Router();

router.use([authRouter, favoritedsRouter, usersRouter, homeContentRouter]);

export default router;
