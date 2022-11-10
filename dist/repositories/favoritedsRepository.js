"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoritedsById = void 0;
const postgreSQL_1 = require("../databases/postgreSQL");
function getFavoritedsById(id) {
    return postgreSQL_1.prisma.favoriteds.findMany({
        where: { userId: id }
    });
}
exports.getFavoritedsById = getFavoritedsById;
//# sourceMappingURL=favoritedsRepository.js.map