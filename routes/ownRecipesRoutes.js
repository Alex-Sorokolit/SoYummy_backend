//http://localhost:5000/api/v1/ownrecipes
const express = require("express");
const asyncHandler = require("express-async-handler");
const { schemas } = require("../models/recipe");
const {
  validateBody,
  authenticate,
  isValidId,
  imageUpload,
} = require("../middlewares");
const {
  ownRecipeCtrl: { addRecipe, removeRecipe, getAllOwnRecipes, addImage },
} = require("../controllers");

const ownRecipesRouter = express.Router();

// Add own recipe
ownRecipesRouter.post(
  "/own-recipes",
  authenticate,
  imageUpload.single("image"),
  validateBody(schemas.recipeJoiSchema),
  asyncHandler(addRecipe)
);

// Add image
// "image" це поле у формі в яке передавати зображення
ownRecipesRouter.patch(
  "/own-recipes/upload",
  authenticate,
  imageUpload.single("image"),
  asyncHandler(addImage)
);

// Remove own recipe
ownRecipesRouter.delete(
  "/own-recipes/:id",
  authenticate,
  isValidId,
  asyncHandler(removeRecipe)
);

// Get all recipes by user createt
ownRecipesRouter.get(
  "/own-recipes",
  authenticate,
  asyncHandler(getAllOwnRecipes)
);

module.exports = ownRecipesRouter;
