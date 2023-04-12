const { Recipe } = require("../models/recipe");

class SearchController {
  async findByTitle(req, res) {
    // дай мені page сторінку якщо на сторінці limit об'єктів
    const { query = "", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit, 10);

    if (!query) {
      res.status(400);
      throw new Error("Controller: Please provide all required fields");
    }

    const result = await Recipe.find({
      title: { $regex: new RegExp(query, "i") },
    })
      .skip(skip)
      .limit(parsedLimit);

    if (!result) {
      res.status(404);
      throw new Error(`${query} not found`);
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

  async findByIngredient(req, res) {
    // дай мені page сторінку якщо на сторінці limit об'єктів
    const { query = "", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit, 10);

    if (!query) {
      res.status(400);
      throw new Error("Controller: Please provide all required fields");
    }
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

    if (!result) {
      res.status(404);
      throw new Error(`${query} not found`);
    }

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
  }
}

const searchCtrl = new SearchController();

module.exports = searchCtrl;
