const { Recipe } = require("../models/recipeModels");
const asyncHandler = require("express-async-handler");

class OwnRecipesController {
  async addRecipe(req, res) {
    // console.log(req.body);
    const { title, instructions, description, category, time, ingredients } =
      req.body;
    if (
      !title ||
      !description ||
      !instructions ||
      !category ||
      !time ||
      !ingredients
    ) {
      res.status(400);
      throw new Error("Controller: Please provide all required fields");
    }

    // дістаємо id із об'єкта запиту і перейменовуємо в owner
    const { _id: owner } = req.user;

    const newRecipe = await Recipe.create({ ...req.body, owner });

    if (!newRecipe) {
      res.status(500);
      throw new Error("Server Error");
    }
    res.status(201).json({
      code: 201,
      message: "success",
      data: newRecipe,
    });
  }
}

const ownRecipeCtrl = new OwnRecipesController();

module.exports = {
  addRecipe: asyncHandler(ownRecipeCtrl.addRecipe),
};
