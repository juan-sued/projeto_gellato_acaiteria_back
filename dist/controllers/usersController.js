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
exports.loginUserController = exports.registerUserController = void 0;
const signInService_1 = __importDefault(require("../services/authServices/signInService"));
const signUpService_1 = require("../services/authServices/signUpService");
function registerUserController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = request.body;
        yield (0, signUpService_1.signUpService)(newUser);
        response.sendStatus(201);
    });
}
exports.registerUserController = registerUserController;
function loginUserController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.body;
        const token = yield (0, signInService_1.default)(user);
        response.status(200).send(token);
    });
}
exports.loginUserController = loginUserController;
//# sourceMappingURL=usersController.js.map