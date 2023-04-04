//http://localhost:5000/api/v1/popular-recipe
const express = require("express");

// const { authenticate } = require("../middlewares");
const popularController = require("../controllers/PopularController");

const popularRecipeRouter = express.Router();

// Add to favorite
//  створити ендпоінт на отримання популярних рецептів.
// Популярність вираховується по тому, як багато користувачей додали рецепт у вибрані.
popularRecipeRouter.get("/popular-recipe", popularController.getFavorites);

module.exports = popularRecipeRouter;
