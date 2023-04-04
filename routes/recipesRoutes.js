//http://localhost:5000/api/v1/recipes
const express = require("express");
const { authenticate, isValidId } = require("../middlewares");
const {
  getCattegory,
  getForMain,
  getForCategory,
  getOne,
} = require("../controllers/RecipesController");
const recipesRouter = express.Router();

// Get category-list /recipes/category-list
recipesRouter.get("/recipes/category-list", getCattegory);

// Get main-page recipes by category /recipes/main-page
// створити ендпоінт для отримання рецептів по категоріям для головної сторінки
recipesRouter.get("/recipes/main-page", getForMain);

// Get 8 recipes by category  /recipes/category:category
//  створити ендпоінт для отримання рецептів по категоріям по 8 рецептів.
recipesRouter.get("/recipes/category/:category", getForCategory);

// Get recipe by ID /recipes/:id
// /recipes/:id - створити ендпоінт для отримання одного рецепта по id
recipesRouter.get("/recipes/:id", isValidId, getOne);

module.exports = recipesRouter;
