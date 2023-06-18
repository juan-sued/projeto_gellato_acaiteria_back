import { Router } from 'express';
import { authRouter } from './authRoutes';
import { favoritedsRouter } from './favoritedsRoutes';
import { usersRouter } from './usersRoutes';
import { homeContentRouter } from './homeRoutes';

const router = Router();

router.use([authRouter, favoritedsRouter, usersRouter, homeContentRouter]);

export default router;
