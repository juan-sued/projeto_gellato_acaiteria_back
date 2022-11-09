import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { favoritedsRouter } from "./favoritedsRoutes.js";
import { homeContentRouter } from "./homeRoutes.js";
var router = Router();
router.use([authRouter, favoritedsRouter, homeContentRouter]);
export default router;
