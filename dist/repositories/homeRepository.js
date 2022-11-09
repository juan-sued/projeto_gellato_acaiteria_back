"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeContent = void 0;
const postgreSQL_1 = require("../databases/postgreSQL");
function getHomeContent() {
    return postgreSQL_1.prisma.users.findFirst();
}
exports.getHomeContent = getHomeContent;
//# sourceMappingURL=homeRepository.js.map