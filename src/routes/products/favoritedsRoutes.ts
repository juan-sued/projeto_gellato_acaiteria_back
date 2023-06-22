import { validateJwtTokenMiddleware } from '@/middlewares';
import { Router } from 'express';

const favoritedsRouter = Router();

favoritedsRouter.get('/favoriteds', validateJwtTokenMiddleware);

export { favoritedsRouter };
