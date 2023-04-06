const { Recipe } = require("../models/recipeModels");
const Ingredients = require("../models/ingredientsModels");
const asyncHandler = require("express-async-handler");

class SearchController {
  async find(req, res) {
    // всі параметри пошуку
    // console.log(req.query);

    // дай мені page сторінку якщо на сторінці limit об'єктів
    const { type = "Title", query = "", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    if (type === "Ingredients") {
      const regex = new RegExp(query, "i");
      const result = await Recipe.aggregate([
        {
          $lookup: {
            from: "ingredients",
            localField: "ingredients._id",
            foreignField: "_id",
            as: "ingredients",
          },
        },
        {
          $match: {
            "ingredients.ttl": {
              $regex: regex,
            },
          },
        },
      ]);

      if (!result) {
        res.status(404);
        throw new Error(`${query} not found`);
      }

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

    if (!result && result.length === 0) {
      res.status(404);
      throw new Error(`${query} not found`);
    }

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
