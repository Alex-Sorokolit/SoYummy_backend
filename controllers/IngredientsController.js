const Ingredient = require("../models/ingredientsModels");

const asyncHandler = require("express-async-handler");

class IngredientsController {
  async getIngredientsList(req, res) {
    res.status(200).json({
      code: 200,
      message: "success",
      data: Ingredient,
      quantity: Ingredient.length,
    });
  }
  async getIngredients(req, res) {
    const { ingredient } = req.params;
    console.log(ingredient);
  }
}

const ingredientCtrl = new IngredientsController();

module.exports = {
  getIngredientsList: asyncHandler(
    ingredientCtrl.getIngredients
  ),
};
