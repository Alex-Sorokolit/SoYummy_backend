//http://localhost:5000/api/v1/ownrecipes
const express = require("express");
const { validateBody, authenticate, isValidId } = require("../middlewares");
const { schemas } = require("../models/recipeModels");
const {
  addRecipe,
  removeRecipe,
  getAllOwnRecipes,
} = require("../controllers/OwnRecipesController");

const ownRecipesRouter = express.Router();

// Add own recipe
ownRecipesRouter.post(
  "/own-recipes",
  validateBody(schemas.recipeJoiSchema),
  authenticate,
  addRecipe
);
// Remove own recipe
ownRecipesRouter.delete(
  "/own-recipes/:id",
  authenticate,
  isValidId,
  removeRecipe
);
// Get all recipes by user createt
ownRecipesRouter.get("/own-recipes", authenticate, getAllOwnRecipes);
module.exports = ownRecipesRouter;
