"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use([express_1.default.json(), (0, cors_1.default)(), routes_1.default, middlewares_1.errorHandlerMiddleware]);
exports.default = app;
//# sourceMappingURL=app.js.map