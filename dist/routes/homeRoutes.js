import { Router } from 'express';
import { homeContentController } from '../controllers/homeController.js';
var homeContentRouter = Router();
homeContentRouter.get('/home-content', homeContentController);
export { homeContentRouter };
