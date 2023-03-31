//http://localhost:5000/api/v1/recipes
const express = require("express");
const recipesController = require("../controllers/RecipesController");
const asyncHandler = require("express-async-handler"); // дозволяє відловлювати помилки (модний try catch)
const recipesRouter = express.Router();

// Get category-list /recipes/category-list
// створити ендпоінт для отримання списку категорій.
// Cписок категорій 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian' Відсортували по алфавіту
recipesRouter.get(
  "/recipes/category-list",
  asyncHandler(recipesController.getCattegory)
);

// Get main-page recipes by category /recipes/main-page
// створити ендпоінт для отримання рецептів по категоріям для головної сторінки
recipesRouter.get(
  "/recipes/main-page",
  (req, res, next) => {
    console.log("спрацював joi");
    next();
  },
  asyncHandler(recipesController.getForMain)
);

// Get 8 recipes by category  /recipes/category:category
//  створити ендпоінт для отримання рецептів по категоріям по 8 рецептів.
recipesRouter.get(
  "/recipes/category:category",
  asyncHandler(recipesController.getForCategory)
);

// Get recipe by ID /recipes/:id
// /recipes/:id - створити ендпоінт для отримання одного рецепта по id
recipesRouter.get("/recipes/:id", asyncHandler(recipesController.getOne));

module.exports = recipesRouter;
