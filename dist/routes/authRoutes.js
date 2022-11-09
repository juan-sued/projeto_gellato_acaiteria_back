"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const index_1 = require("../schemas/index");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/sign-up', (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(index_1.authSchemas.signUpSchema), usersController_1.registerUserController);
exports.authRouter.post('/sign-in', (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(index_1.authSchemas.signInSchema), usersController_1.loginUserController);
//# sourceMappingURL=authRoutes.js.map