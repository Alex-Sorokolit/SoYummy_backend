//http://localhost:5000/api/v1/ownrecipes
const express = require("express");
const { validateBody, authenticate, isValidId } = require("../middlewares");
const { schemas } = require("../models/recipeModels");
const {
  addRecipe,
  removeRecipe,
} = require("../controllers/OwnRecipesController");

const ownRecipesRouter = express.Router();

// Add recipe
//  створити ендпоінт для додавання рецептів
ownRecipesRouter.post(
  "/own-recipes",
  validateBody(schemas.recipeJoiSchema),
  authenticate,
  addRecipe
);
// Remove recipe
// створити ендпоінт для видалення рецепта
ownRecipesRouter.delete(
  "/own-recipes/:recipeId",
  authenticate,
  isValidId,
  removeRecipe
);
// Get all recipes by user createt
// створити ендпоінт для отримання рецептів створених цим же юзером

ownRecipesRouter.module.exports = ownRecipesRouter;
