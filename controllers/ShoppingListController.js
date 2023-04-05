const Ingredient = require("../models/ingredientsModels");
const { User } = require("../models/user");

const asyncHandler = require("express-async-handler");

class ShoppingListController {
  async addShoppingList(req, res) {
    const { _id: userId } = req.user;
    const { _id: ingredientId } = req.body;
    const ingredient = await Ingredient.findById(ingredientId);
    console.log("ingredient", ingredient);
    if (!ingredient) {
      return res.status(404).json({
        code: 404,
        message: "Ingredient not found",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { shoppingList: ingredientId } },
      { new: true }
    ).populate("shoppingList");

    res.status(201).json({
      code: 201,
      message: "The ingredient has been added to the list",
      data: updatedUser.shoppingList,
    });
  }

  async getShopping(req, res) {
    const { _id: userId } = req.user;

    const user = await User.findById(userId).populate({
      path: "shoppingList",
      model: "ingredient",
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
    const { id: ingredientId } = req.params;
    console.log("ingredientId", ingredientId);
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
  addShoppingList: asyncHandler(shoppingCtrl.addShoppingList),
  getShopping: asyncHandler(shoppingCtrl.getShopping),
  deleteShopping: asyncHandler(shoppingCtrl.deleteShopping),
};
