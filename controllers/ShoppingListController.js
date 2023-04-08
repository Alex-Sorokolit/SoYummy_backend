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
    // якщо потрібно щоб id не могли дублюватись використовуємо $addToSet: замість $push:
    const result = await User.findByIdAndUpdate(
      userId,
      { $push: { shoppingList: ingredient } },
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
  // async deleteShopping(req, res) {
  //   const { _id: userId } = req.user;
  //   // отримуємо інгредієнт від користувача
  //   const { _id: ingredientId, measure: ingredientMeasure } = req.body;

  //   if (!ingredientId || !ingredientMeasure) {
  //     res.status(400);
  //     throw new Error("Controller: Please provide all required fields");
  //   }

  //   // Шукаємо інгредієнт у списку по id і по measure
  //   const ingredient = await User.findOne(
  //     {
  //       _id: userId,
  //       shoppingList: {
  //         $elemMatch: { _id: ingredientId, measure: ingredientMeasure },
  //       },
  //     },
  //     {
  //       shoppingList: {
  //         $elemMatch: { _id: ingredientId, measure: ingredientMeasure },
  //       },
  //     }
  //   );

  //   // Якщо не знайшли, викидаємо помилку
  //   if (!ingredient) {
  //     res.status(404);
  //     throw new Error("Ingredient not found in shopping list");
  //   }

  //   // Якщо знайшли, видаляємо
  //   const result = await User.findByIdAndUpdate(
  //     userId,
  //     {
  //       $pull: {
  //         shoppingList: { _id: ingredientId, measure: ingredientMeasure },
  //       },
  //     },
  //     { new: true }
  //   );

  //   // повертаємо результат
  //   res
  //     .status(200)
  //     .json({
  //       code: 200,
  //       message: "success",
  //       data: result.shoppingList,
  //     })
  //     .setHeader("Cache-Control", "no-cache");
  // }
  async deleteShopping(req, res) {
    const { _id: userId } = req.user;
    const { _id: ingredientId, measure: ingredientMeasure } = req.body;

    if (!ingredientId || !ingredientMeasure) {
      res.status(400);
      throw new Error("Controller: Please provide all required fields");
    }

    // Шукаємо інгредієнт у списку по id і по measure
    const ingredient = await User.findOne(
      {
        _id: userId,
        shoppingList: {
          $elemMatch: { _id: ingredientId, measure: ingredientMeasure },
        },
      },
      {
        shoppingList: {
          $elemMatch: { _id: ingredientId, measure: ingredientMeasure },
        },
      }
    );

    // Якщо не знайшли, повертаємо порожній масив або об'єкт з помилкою
    if (!ingredient) {
      return res.status(404).json({
        code: 404,
        message: "Ingredient not found in shopping list",
        data: [],
      });
    }

    // Якщо знайшли, видаляємо
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          shoppingList: { _id: ingredientId, measure: ingredientMeasure },
        },
      },
      { new: true }
    );

    // повертаємо результат
    res.status(200).json({
      code: 200,
      message: "success",
      data: result.shoppingList,
    });
  }

  async getShopping(req, res) {
    // Отримуємо id користувача
    const { _id: userId } = req.user;
    console.log(userId);

    // Шукаємо користувача по id і заповнюємо інгредієнти об'єктами
    const result = await User.findById(userId).populate({
      path: "shoppingList._id",
      model: "Ingredient",
    });

    // Якщо користувача не знайшли викидаємо помилку
    if (!result) {
      res.status(404);
      throw new Error(`User not found`);
    }

    // Якщо користувача знайшли повертаємо результат
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
    });
  }
}

const shoppingCtrl = new ShoppingListController();

module.exports = {
  addToShoppingList: asyncHandler(shoppingCtrl.addToShoppingList),
  getShopping: asyncHandler(shoppingCtrl.getShopping),
  deleteShopping: asyncHandler(shoppingCtrl.deleteShopping),
};
