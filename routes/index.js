const authRouter = require("./authRoutes");
const recipesRouter = require("./recipesRoutes");
const ingredientsRouter = require("./ingredientsRoutes");
const searchRouter = require("./searchRoutes");
const shoppintListRouter = require("./shoppintListRoutes");
const popularRecipeRouter = require("./popularRecipeRoutes");
const ownRecipesRouter = require("./ownRecipesRoutes");
const favoritesRouter = require("./favoritesRoutes");

module.exports = {
  authRouter,
  recipesRouter,
  ingredientsRouter,
  searchRouter,
  shoppintListRouter,
  popularRecipeRouter,
  ownRecipesRouter,
  favoritesRouter,
};
