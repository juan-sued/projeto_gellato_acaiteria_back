"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFavoritedsController = void 0;
const getFavoritedsService_1 = require("../services/favoritedsServices/getFavoritedsService");
async function getAllFavoritedsController(request, response) {
    const { idUser } = response.locals;
    const favoritedsList = await (0, getFavoritedsService_1.getFavoritedByIdService)(idUser);
    response.status(200).send(favoritedsList);
}
exports.getAllFavoritedsController = getAllFavoritedsController;
//# sourceMappingURL=favoritedsController.js.map