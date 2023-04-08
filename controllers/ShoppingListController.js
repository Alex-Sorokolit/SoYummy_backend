// const mongoose = require("mongoose");
// const ObjectId = require("mongoose").Types.ObjectId;

const asyncHandler = require("express-async-handler");

const Ingredient = require("../models/ingredientsModels");
const { User } = require("../models/user");

class ShoppingListController {
  async addToShoppingList(req, res) {
    const { _id: id, measure } = req.body;
    console.log(id, measure);
  }
  async getShopping(req, res) {
    const { _id: userId } = req.user;

    const user = await User.findById(userId).populate({
      path: "shoppingList",
      model: "Ingredient",
    });

    const shoppingUpdate = user.shoppingList;

    if (!shoppingUpdate) {
      res.json({
        message: "No ingredient have been added yet",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Our ingredients",
      data: shoppingUpdate,
      quantity: shoppingUpdate.length,
    });
  }

  async deleteShopping(req, res) {
    const { _id: userId } = req.user;
    const { _id: ingredientId } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { shoppingList: ingredientId } },
      { new: true }
    ).populate("shoppingList");
    if (!ingredientId) {
      res.json({
        message: "There is no such ingredient here anymore",
      });
    }
    res.status(200).json({
      code: 200,
      message: "The ingredient has been removed from the shopping list ",
      data: updateUser.shoppingList,
    });
  }
}

const shoppingCtrl = new ShoppingListController();

module.exports = {
  addToShoppingList: asyncHandler(shoppingCtrl.addToShoppingList),
  getShopping: asyncHandler(shoppingCtrl.getShopping),
  deleteShopping: asyncHandler(shoppingCtrl.deleteShopping),
};
