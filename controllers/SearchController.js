const Recipe = require("../models/recipeModels");
const Ingredients = require("../models/ingredientsModels");
const asyncHandler = require("express-async-handler");
const RecipesController = require("./RecipesController");

class SearchController {
  async find(req, res) {
    // всі параметри пошуку
    console.log(req.query);

    // дай мені page сторінку якщо на сторінці limit об'єктів
    const { type = "Title", query = "", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    if (type === "Ingredients") {
      const result = await Recipe.find({
        title: { $regex: new RegExp(query, "i") },
      })
        .skip(skip)
        .limit(limit);
      res.status(200).json({
        code: 200,
        message: "success",
        data: result,
        quantity: result.length,
      });
    }

    const result = await Recipe.find({
      title: { $regex: new RegExp(query, "i") },
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
    });
  }
}

const searchCtrl = new SearchController();

module.exports = {
  find: asyncHandler(searchCtrl.find),
};
