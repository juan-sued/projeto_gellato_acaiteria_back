"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritedsRouter = void 0;
const express_1 = require("express");
const favoritedsController_1 = require("../controllers/favoritedsController");
const validateJwtTokenMiddleware_1 = __importDefault(require("../middlewares/validateJwtTokenMiddleware"));
const favoritedsRouter = (0, express_1.Router)();
exports.favoritedsRouter = favoritedsRouter;
favoritedsRouter.get('/favoriteds', validateJwtTokenMiddleware_1.default, favoritedsController_1.getAllFavoritedsController);
//# sourceMappingURL=favoritedsRoutes.js.map