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
    const parsedLimit = parseInt(limit, 10);
    if (type === "Ingredients") {
      try {
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
        ])
          .skip(skip)
          .limit(parsedLimit);

        const count = await Recipe.aggregate([
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
          {
            $count: "count",
          },
        ]);

        const total = count.length ? count[0].count : 0;

        res.status(200).json({
          code: 200,
          message: "success",
          data: result,
          quantity: result.length,
          total: total,
        });
      } catch (error) {
        res.status(404).json({
          code: 404,
          message: `${query} not found`,
          error: error.message,
        });
      }
    }

    const result = await Recipe.find({
      title: { $regex: new RegExp(query, "i") },
    })
      .skip(skip)
      .limit(limit);

    if (!result && result.length === 0) {
      res.status(404);
      return res.json({
        code: 404,
        message: `${query} not found`,
      });
    }

    const totalCount = await Recipe.countDocuments({
      title: { $regex: new RegExp(query, "i") },
    });

    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
      total: totalCount,
    });
  }
}

const searchCtrl = new SearchController();

module.exports = {
  find: asyncHandler(searchCtrl.find),
};
