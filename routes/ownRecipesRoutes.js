//http://localhost:5000/api/v1/ownrecipes
const express = require("express");
const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../middlewares");
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
  upload.single("thumb"),
  addRecipe
);
// ми очікуємо в полі thumb один файл, всі інші поля будуть текстовими, їх треба записати в req.body
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
