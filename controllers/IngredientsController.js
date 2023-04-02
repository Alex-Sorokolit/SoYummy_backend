const Ingredient = require("../models/ingredientsModels");

const asyncHandler = require("express-async-handler");

class IngredientsController {
  async getIngredientsList(req, res) {
    console.log(req.params);
    const result = await Ingredient.find();
    if (!result) {
      res.status(400);
      throw new Error("Bad Request");
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
    });
  }
}

const ingredientCtrl = new IngredientsController();

module.exports = {
  getIngredientsList: asyncHandler(
    ingredientCtrl.getIngredientsList
  ),
};
