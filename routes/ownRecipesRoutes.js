const express = require("express");
const asyncHandler = require("express-async-handler");
const { schemas } = require("../models/recipe");
const {
  validateBody,
  authenticate,
  isValidId,
  uploadCloud,
} = require("../middlewares");
const {
  ownRecipeCtrl: { addRecipe, removeRecipe, getAllOwnRecipes, addImage },
} = require("../controllers");

const cloudOptions = {
  fieldname: "image",
  destFolder: "recipes",
  transformation: {
    width: 700,
    height: 700,
    crop: "fill",
    gravity: "auto",
    zoom: 0.75,
  },
};

const ownRecipesRouter = express.Router();

// Add own recipe
ownRecipesRouter.post(
  "/own-recipes",
  authenticate,
  // imageUpload.single("image"),
  uploadCloud(cloudOptions),
  validateBody(schemas.recipeJoiSchema),
  asyncHandler(addRecipe)
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
