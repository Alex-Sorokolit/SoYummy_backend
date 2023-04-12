const controllers = require("./AuthController");
const recipeCtrl = require("./RecipesController");
const ownRecipeCtrl = require("./OwnRecipesController");
const shoppingCtrl = require("./ShoppingListController");

module.exports = {
  register: controllers.register,
  login: controllers.login,
  getCurrent: controllers.getCurrent,
  logout: controllers.logout,
  getCurrentUser: controllers.getCurrentUser,
  updateUser: controllers.updateUser,
  updateAvatar: controllers.updateAvatar,
  subscription: controllers.subscription,
  googleAuth: controllers.googleAuth,
  recipeCtrl,
  ownRecipeCtrl,
  shoppingCtrl,
};
