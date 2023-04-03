const Ingredient = require("../models/ingredientsModels");
const Recipe = require("../models/recipeModels");
const asyncHandler = require("express-async-handler");

class IngredientsController {
  async getIngredientsList(req, res) {
    // console.log(req.params);
    const { recipeid } = req.params;

    const result = await Recipe.findById(recipeid).populate(
      "ingredients"
    );
    if (!result) {
      res.status(400);
      throw new Error("Bad Request");
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result.ingredients,
      quantity: result.ingredients.length,
    });
  }
}

const ingredientCtrl = new IngredientsController();

module.exports = {
  getIngredientsList: asyncHandler(
    ingredientCtrl.getIngredientsList
  ),
};
