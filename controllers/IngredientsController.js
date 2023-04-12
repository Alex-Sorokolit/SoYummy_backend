const Ingredient = require("../models/ingredient");

class IngredientsController {
  async getIngredientsList(req, res) {
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

  async searchIngredient(req, res) {
    // дай мені page сторінку якщо на сторінці limit об'єктів
    const { query = "", page = 1, limit = 20 } = req.query;
    console.log(req.query);
    const skip = (page - 1) * limit;
    console.log(query);

    const result = await Ingredient.find({
      ttl: { $regex: new RegExp(query, "i") },
    })
      .skip(skip)
      .limit(limit);

    if (!result && result.length === 0) {
      res.status(404);
      throw new Error(`Ingredient ${query} not found`);
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

module.exports = ingredientCtrl;
