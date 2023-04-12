//http://localhost:5000/api/v1/ingredients
const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  ingredientCtrl: { getIngredientsList, searchIngredient },
} = require("../controllers");

const ingredientsRouter = express.Router();

// Get ingredients-list
ingredientsRouter.get("/ingredients/list", asyncHandler(getIngredientsList));

// Search ingredient
ingredientsRouter.get("/ingredients", asyncHandler(searchIngredient));

module.exports = ingredientsRouter;
