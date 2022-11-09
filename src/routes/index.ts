import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { favoritedsRouter } from "./favoritedsRoutes.js";
import { homeContentRouter } from "./homeRoutes.js";
const router = Router();

router.use([authRouter, favoritedsRouter, homeContentRouter]);

export default router;