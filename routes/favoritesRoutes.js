//http://localhost:5000/api/v1/favorite
const express = require("express");
const favoritesController = require("../controllers/FavoritesController");

const { authenticate } = require("../middlewares");

const favoritesRouter = express.Router();

// Add to favorite
//  створити ендпоінт для додавання рецептів до обраних
favoritesRouter.post(
  "/favorites",
  authenticate,
  favoritesController.addFavorites
);
// get favorites
// створити ендпоінт для отримання рецептів авторизованого користувача доданих ним же в обрані
favoritesRouter.get(
  "/favorites",
  authenticate,
  favoritesController.getFavorites
);
// remove from favorites
// створити ендпоінт для видалення рецептів авторизованого користувача доданих цим же до обраних
favoritesRouter.delete(
  "/favorites",
  authenticate,
  favoritesController.deleteFavorites
);

module.exports = favoritesRouter;
