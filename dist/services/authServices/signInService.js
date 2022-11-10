"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../../repositories");
const utils_1 = require("../../utils");
const jwtToken_1 = require("./jwtToken");
async function signInService(user) {
    const userRegistered = await repositories_1.usersRepository.getUserByEmail(user.email);
    if (!userRegistered)
        throw utils_1.errorFactory.notFound('user');
    const dbPassword = userRegistered?.password ?? '';
    const isValidPassword = await bcrypt_1.default.compare(user.password, dbPassword);
    if (!isValidPassword)
        throw utils_1.errorFactory.forbidden();
    const userId = Number(userRegistered?.id) ?? 0;
    const token = (0, jwtToken_1.createToken)(userId);
    return token;
}
exports.signInService = signInService;
//# sourceMappingURL=signInService.js.map