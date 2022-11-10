"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByFilterName = exports.getAllUsers = exports.getUserById = exports.insertUser = exports.getUserByEmail = void 0;
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
function getAllUsers() {
    return postgreSQL_1.prisma.users.findMany();
}
exports.getAllUsers = getAllUsers;
function getUsersByFilterName(name) {
    return postgreSQL_1.prisma.users.findMany({
        where: {
            name: {
                startsWith: `${name}`,
                mode: 'insensitive'
            }
        }
    });
}
exports.getUsersByFilterName = getUsersByFilterName;
async function insertUser(newUser) {
    delete newUser.confirmPassword;
    const result = await postgreSQL_1.prisma.users.create({ data: newUser });
    if (!result)
        throw { type: 'error' };
}
exports.insertUser = insertUser;
//# sourceMappingURL=usersRepository.js.map