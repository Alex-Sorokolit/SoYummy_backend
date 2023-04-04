// const Recipe = require("../models/recipeModels");
// const { User } = require("../models/user");

const asyncHandler = require("express-async-handler");

class ShoppingListController {
  async addShoppingList(req, res) {}
  async deleteShopping(req, res) {}
  async getShopping(req, res) {}
}

const shoppingCtrl = new ShoppingListController();

module.exports = {
  addShopping: asyncHandler(shoppingCtrl.addShopping),
  getShopping: asyncHandler(shoppingCtrl.getShopping),
  deleteShopping: asyncHandler(shoppingCtrl.deleteShopping),
};
