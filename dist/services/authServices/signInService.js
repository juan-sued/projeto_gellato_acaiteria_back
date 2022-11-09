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
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../../repositories");
const utils_1 = require("../../utils");
const jwtToken_1 = require("./jwtToken");
function signInService(user) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const userRegistered = yield repositories_1.usersRepository.getUserByEmail(user.email);
        if (!userRegistered)
            throw utils_1.errorFactory.notFound("user");
        const dbPassword = (_a = userRegistered === null || userRegistered === void 0 ? void 0 : userRegistered.password) !== null && _a !== void 0 ? _a : "";
        const isValidPassword = yield bcrypt_1.default.compare(dbPassword, user.password);
        if (!isValidPassword)
            throw utils_1.errorFactory.forbidden();
        const userId = (_b = Number(userRegistered === null || userRegistered === void 0 ? void 0 : userRegistered.id)) !== null && _b !== void 0 ? _b : 0;
        const token = (0, jwtToken_1.createToken)(userId);
        return token;
    });
}
exports.default = signInService;
//# sourceMappingURL=signInService.js.map