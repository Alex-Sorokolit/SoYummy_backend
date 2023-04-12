const { Recipe } = require("../models/recipe");
const categories = require("../data/categories");

class RecipesController {
  async getCattegory(req, res) {
    res.status(200).json({
      code: 200,
      message: "success",
      data: categories,
      quantity: categories.length,
    });
  }

  async getForMain(req, res) {
    const result = await Recipe.aggregate([
      { $sort: { category: 1 } },
      { $group: { _id: "$category", documents: { $push: "$$ROOT" } } },
      { $project: { documents: { $slice: ["$documents", 4] } } },
    ]);
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

  async getForCategory(req, res) {
    const { category } = req.params;

    if (!categories.find((item) => item === category)) {
      res.status(404);
      throw new Error(`Category ${category} not found`);
    }

    const result = await Recipe.find({ category: `${category}` }).sort({
      createdAt: -1,
    });

    if (!result) {
      res.status(404);
      throw new Error(`Category ${category} not found`);
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
    });
  }

  async getOne(req, res) {
    const { id } = req.params;
    const result = await Recipe.findById(id).populate({
      path: "ingredients._id",
      model: "Ingredient",
    });

    if (!result) {
      res.status(404);
      throw new Error(`Recipe with id=${id} not found`);
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
    });
  }
}
const recipeCtrl = new RecipesController();

module.exports = recipeCtrl;
