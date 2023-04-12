const { Recipe } = require("../models/recipe");
const asyncHandler = require("express-async-handler");

class OwnRecipesController {
  // Add ownRecipe
  async addRecipe(req, res) {
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
  // Add Image
  async addImage(req, res) {
    if (!req.file) {
      res.status(400);
      throw new Error("Controller: Image require");
    }
    const { path: filePath } = req.file;

    res.status(201).json({
      code: 201,
      message: "success",
      data: filePath,
    });
  }

  // Remove ownRecipe
  async removeRecipe(req, res) {
    const { id: recipeId } = req.params;
    const { _id: userId } = req.user;

    if (!recipeId) {
      res.status(400);
      throw new Error("Controller: recipeId is required");
    }

    if (!userId) {
      res.status(400);
      throw new Error("Controller: user not authorized");
    }

    // знайти рецепт по id і перевірити чи належить цей рецепт користувачу
    const result = await Recipe.findOne({ _id: recipeId, owner: userId });

    if (!result) {
      res.status(400);
      throw new Error("Controller: Recipe not found");
    }

    //  видалити рецепт
    const deletedRecipe = await Recipe.findByIdAndRemove(recipeId);

    if (!deletedRecipe) {
      res.status(400);
      throw new Error("Controller: Recipe not found");
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Recipe deleted",
      data: deletedRecipe,
    });
  }

  // Get all ownRecipes
  async getAllOwnRecipes(req, res) {
    const { _id: userId } = req.user;

    const result = await Recipe.find({ owner: userId });

    if (!result) {
      res.status(400);
      throw new Error("Controller: Recipes not found");
    }

    res.json({
      status: "success",
      code: 200,
      message: "Own Recipes",
      data: result,
      quantity: result.length,
    });
  }
}

const ownRecipeCtrl = new OwnRecipesController();

module.exports = {
  addRecipe: asyncHandler(ownRecipeCtrl.addRecipe),
  addImage: asyncHandler(ownRecipeCtrl.addImage),
  removeRecipe: asyncHandler(ownRecipeCtrl.removeRecipe),
  getAllOwnRecipes: asyncHandler(ownRecipeCtrl.getAllOwnRecipes),
};
