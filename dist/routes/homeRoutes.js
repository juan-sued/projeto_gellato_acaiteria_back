"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeContentRouter = void 0;
const express_1 = require("express");
const homeController_1 = require("../controllers/homeController");
const homeContentRouter = (0, express_1.Router)();
exports.homeContentRouter = homeContentRouter;
homeContentRouter.get('/home-content', homeController_1.homeContentController);
//# sourceMappingURL=homeRoutes.js.map