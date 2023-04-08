// const mongoose = require("mongoose");
// const ObjectId = require("mongoose").Types.ObjectId;

const asyncHandler = require("express-async-handler");

const Ingredient = require("../models/ingredientsModels");
const { User } = require("../models/user");

class ShoppingListController {
  async addToShoppingList(req, res) {
    // Отримуємо id користувача
    const { _id: userId } = req.user;

    // отримуємо інгредієнт від користувача
    const { _id, measure } = req.body;
    // const { shoppingList } = req.body;
    const ingredient = { _id, measure };
    // console.log(ingredient);
    // Перевіряємо чи передані всі дані
    if (!_id || !measure) {
      res.status(400);
      throw new Error("Controller: Please provide all required fields");
    }
    // Оновлюємо користувача
    const result = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { shoppingList: ingredient } },
      { new: true }
    );
    // Якщо не вдалось записати викидаємо помилку
    if (!result) {
      res.status(400);
      throw new Error("Bad Request");
    }
    // Якщо вдалося записати повертаємо результат
    res.status(200).json({
      code: 200,
      message: "success",
      data: result.shoppingList,
    });
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

/* 
{
  "ingredients": [
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e3719"
      },
      "measure": "4"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e36e8"
      },
      "measure": "1 inch"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e36e3"
      },
      "measure": "8 cloves"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e373f"
      },
      "measure": "1.5 tsp"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e36b8"
      },
      "measure": "1 tsp"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e3782"
      },
      "measure": "½ tsp"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e36a6"
      },
      "measure": "To your taste"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e3683"
      },
      "measure": "2"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e3774"
      },
      "measure": "1 tbsp"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e3777"
      },
      "measure": "2 marble sized"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e378e"
      },
      "measure": "2.5 tbsp"
    },
    {
      "_id": {
        "$oid": "640c2dd963a319ea671e372b"
      },
      "measure": "for frying"
    }
  ]
} */
