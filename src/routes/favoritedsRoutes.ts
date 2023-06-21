import { Router } from 'express';
import { getAllFavoritedsController } from '@/controllers/favoritedsController';
import validateJwtTokenMiddleware from '@/middlewares';

const favoritedsRouter = Router();

favoritedsRouter.get('/favoriteds', validateJwtTokenMiddleware, getAllFavoritedsController);

export { favoritedsRouter };
