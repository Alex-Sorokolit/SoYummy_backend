const authCtrl = require("./AuthController");
const favoritesCtrl = require("./FavoritesController");
const ingredientCtrl = require("./IngredientsController");
const ownRecipeCtrl = require("./OwnRecipesController");
const popularCtrl = require("./PopularController");
const recipeCtrl = require("./RecipesController");
const shoppingCtrl = require("./ShoppingListController");
const searchCtrl = require("./SearchController");

module.exports = {
  authCtrl,
  favoritesCtrl,
  ingredientCtrl,
  ownRecipeCtrl,
  popularCtrl,
  recipeCtrl,
  searchCtrl,
  shoppingCtrl,
};
