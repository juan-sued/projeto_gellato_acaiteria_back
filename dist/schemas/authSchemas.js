"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required().min(1),
    email: joi_1.default.string().email().trim().required().min(1),
    password: joi_1.default.string().trim().required().min(1),
    confirmPassword: joi_1.default.ref('password')
});
exports.signInSchema = joi_1.default.object({
    email: joi_1.default.string().email().trim().required().min(1),
    password: joi_1.default.string().trim().required().min(1)
});
//# sourceMappingURL=authSchemas.js.map