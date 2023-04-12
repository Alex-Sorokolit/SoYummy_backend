//http://localhost:5000/api/v1/ownrecipes
const express = require("express");
const {
  validateBody,
  authenticate,
  isValidId,
  imageUpload,
} = require("../middlewares");
const { schemas } = require("../models/recipe");
const {
  addRecipe,
  removeRecipe,
  getAllOwnRecipes,
  addImage,
} = require("../controllers/OwnRecipesController");

const ownRecipesRouter = express.Router();

// Add own recipe
ownRecipesRouter.post(
  "/own-recipes",
  validateBody(schemas.recipeJoiSchema),
  authenticate,
  addRecipe
);
// Add image
// "image" це поле у формі куди передавати зображення
ownRecipesRouter.patch(
  "/own-recipes/upload",
  authenticate,
  imageUpload.single("image"),
  addImage
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
