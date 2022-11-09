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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.insertUser = exports.getUserByEmail = void 0;
const postgreSQL_1 = require("../databases/postgreSQL");
function getUserByEmail(email) {
    return postgreSQL_1.prisma.users.findFirst({
        where: { email }
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserById(id) {
    return postgreSQL_1.prisma.users.findFirst({
        where: { id }
    });
}
exports.getUserById = getUserById;
function insertUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        delete newUser.confirmPassword;
        const result = yield postgreSQL_1.prisma.users.create({ data: newUser });
        if (!result)
            throw { type: "error" };
    });
}
exports.insertUser = insertUser;
//# sourceMappingURL=usersRepository.js.map