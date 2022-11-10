"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeContent = void 0;
const repositories_1 = require("../../repositories");
async function getHomeContent() {
    const FavoritedsById = await repositories_1.homeRepository.getHomeContent();
    return FavoritedsById;
}
exports.getHomeContent = getHomeContent;
//# sourceMappingURL=homeContentService.js.map