"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = require("./authRoutes");
const favoritedsRoutes_1 = require("./favoritedsRoutes");
const homeRoutes_1 = require("./homeRoutes");
const usersRoutes_1 = require("./usersRoutes");
const router = (0, express_1.Router)();
router.use([authRoutes_1.authRouter, favoritedsRoutes_1.favoritedsRouter, usersRoutes_1.usersRouter, homeRoutes_1.homeContentRouter]);
exports.default = router;
//# sourceMappingURL=index.js.map