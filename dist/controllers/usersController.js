"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = void 0;
const usersService_1 = require("../services/usersService");
async function getUsersController(request, response) {
    const { name } = request.query;
    let users = [];
    if (typeof name === 'string')
        users = await (0, usersService_1.getUsersByFilterNameService)(name);
    users = await (0, usersService_1.getAllUsersService)();
    response.status(200).send(users);
}
exports.getUsersController = getUsersController;
//# sourceMappingURL=usersController.js.map