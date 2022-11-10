"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpService = void 0;
const index_1 = require("../../repositories/index");
const utils_1 = require("../../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function signUpService(newUser) {
    const { password, confirmPassword } = newUser;
    const userRegistered = await index_1.usersRepository.getUserByEmail(newUser.email);
    if (userRegistered)
        throw utils_1.errorFactory.conflict("There's already a user registered with this email.");
    if (confirmPassword !== password)
        throw utils_1.errorFactory.conflict("The passwords don't match.");
    newUser.password = await bcrypt_1.default.hash(password, 10);
    await index_1.usersRepository.insertUser(newUser);
}
exports.signUpService = signUpService;
//# sourceMappingURL=signUpService.js.map