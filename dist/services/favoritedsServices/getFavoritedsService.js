"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoritedByIdService = void 0;
const repositories_1 = require("../../repositories");
async function getFavoritedByIdService(userId) {
    const FavoritedsById = await repositories_1.favoritedsRepository.getFavoritedsById(userId);
    return FavoritedsById;
}
exports.getFavoritedByIdService = getFavoritedByIdService;
//# sourceMappingURL=getFavoritedsService.js.map