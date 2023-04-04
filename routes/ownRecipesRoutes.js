//http://localhost:5000/api/v1/ownrecipes
const express = require("express");
const { validateBody, authenticate } = require("../middlewares");
const { schemas } = require("../models/recipeModels");
const { addRecipe } = require("../controllers/OwnRecipesController");

const ownRecipesRouter = express.Router();

// Add recipe
//  створити ендпоінт для додавання рецептів
ownRecipesRouter.post(
  "/own-recipes",
  validateBody(schemas.recipeJoiSchema),
  addRecipe
);
// Remove recipe
// створити ендпоінт для видалення рецепта

// Get all recipes by user createt
// створити ендпоінт для отримання рецептів створених цим же юзером

module.exports = ownRecipesRouter;
