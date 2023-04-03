const Ingredient = require("../models/ingredientsModels");
const Recipe = require("../models/recipeModels");
const asyncHandler = require("express-async-handler");

class IngredientsController {
  async getIngredientsList(req, res) {
    const { recipeid } = req.params;

    const result = await Recipe.findById(recipeid).populate({
      path: "ingredients._id",
      model: "Ingredient",
    });

    if (!result) {
      res.status(400);
      throw new Error("Bad Request");
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
    });
  }
}

const ingredientCtrl = new IngredientsController();

module.exports = {
  getIngredientsList: asyncHandler(ingredientCtrl.getIngredientsList),
};
