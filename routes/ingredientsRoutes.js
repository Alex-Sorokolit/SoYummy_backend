const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate } = require("../middlewares");
const {
  ingredientCtrl: { getIngredientsList, searchIngredient },
} = require("../controllers");

const ingredientsRouter = express.Router();

// Get ingredients-list
ingredientsRouter.get(
  "/ingredients/list",
  authenticate,
  asyncHandler(getIngredientsList)
);

// Search ingredient
ingredientsRouter.get(
  "/ingredients",
  authenticate,
  asyncHandler(searchIngredient)
);

module.exports = ingredientsRouter;
