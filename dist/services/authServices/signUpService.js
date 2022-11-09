"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpService = void 0;
const index_1 = require("../../repositories/index");
const index_2 = require("../../utils/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
function signUpService(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, confirmPassword } = newUser;
        const userRegistered = yield index_1.usersRepository.getUserByEmail(newUser.email);
        if (userRegistered)
            throw index_2.errorFactory.conflict("There's already a user registered with this email.");
        if (confirmPassword !== password)
            throw index_2.errorFactory.conflict("The passwords don't match.");
        newUser.password = yield bcrypt_1.default.hash(password, 10);
        yield index_1.usersRepository.insertUser(newUser);
    });
}
exports.signUpService = signUpService;
//# sourceMappingURL=signUpService.js.map