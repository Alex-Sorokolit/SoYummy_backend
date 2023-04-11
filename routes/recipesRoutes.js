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

// Get category-list
recipesRouter.get("/recipes/category-list", authenticate, getCattegory);

// Get main-page recipes by category
recipesRouter.get("/recipes/main-page", authenticate, getForMain);

// Get 8 recipes by category
recipesRouter.get("/recipes/category/:category", authenticate, getForCategory);

// Get recipe by ID
recipesRouter.get("/recipes/:id", authenticate, isValidId, getOne);

module.exports = recipesRouter;
