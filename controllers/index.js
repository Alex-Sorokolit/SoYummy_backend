const authCtrl = require("./AuthController");
const recipeCtrl = require("./RecipesController");
const ownRecipeCtrl = require("./OwnRecipesController");
const shoppingCtrl = require("./ShoppingListController");
const favoritesCtrl = require("./FavoritesController");
const ingredientCtrl = require("./IngredientsController");

module.exports = {
  authCtrl,
  recipeCtrl,
  ownRecipeCtrl,
  shoppingCtrl,
  favoritesCtrl,
  ingredientCtrl,
};
