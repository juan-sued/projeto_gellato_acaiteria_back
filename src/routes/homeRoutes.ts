import { Router } from 'express';
import { homeContentController } from '../controllers/homeController';

const homeContentRouter = Router();

homeContentRouter.get('/home-content', homeContentController);

export  {homeContentRouter};
