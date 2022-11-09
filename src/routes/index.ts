import { Router } from "express";
import { authRouter } from "./authRoutes";
import { favoritedsRouter } from "./favoritedsRoutes";
import { homeContentRouter } from "./homeRoutes";

const router = Router();

router.use([authRouter, favoritedsRouter, homeContentRouter]);

export default router;