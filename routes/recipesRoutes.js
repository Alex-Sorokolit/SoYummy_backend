//http://localhost:5000/api/v1/recipes
const express = require("express");
const asyncHandler = require("express-async-handler"); // дозволяє відловлювати помилки (модний try catch)
const { authenticate, isValidId } = require("../middlewares");
const {
  recipeCtrl: { getCattegory, getForMain, getForCategory, getOne },
} = require("../controllers");

const recipesRouter = express.Router();

// Get category-list
recipesRouter.get(
  "/recipes/category-list",
  authenticate,
  asyncHandler(getCattegory)
);

// Get main-page recipes by category
recipesRouter.get("/recipes/main-page", authenticate, asyncHandler(getForMain));

// Get 8 recipes by category
recipesRouter.get(
  "/recipes/category/:category",
  authenticate,
  asyncHandler(getForCategory)
);

// Get recipe by ID
recipesRouter.get(
  "/recipes/:id",
  authenticate,
  isValidId,
  asyncHandler(getOne)
);

module.exports = recipesRouter;
