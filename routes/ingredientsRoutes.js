//http://localhost:5000/api/v1/ingredients
const {
  getIngredientsList,
  searchIngredient,
} = require("../controllers/IngredientsController");

const express = require("express");

const ingredientsRouter = express.Router();

// Get ingredients-list
ingredientsRouter.get("/ingredients/list", getIngredientsList);

// Search ingredient
ingredientsRouter.get("/ingredients", searchIngredient);

module.exports = ingredientsRouter;
