//http://localhost:5000/api/v1/popular-recipe
const express = require("express");

const popularRecipeRouter = express.Router();

// Add to favorite
//  створити ендпоінт на отримання популярних рецептів.
// Популярність вираховується по тому, як багато користувачей додали рецепт у вибрані.

module.exports = popularRecipeRouter;
