const Recipe = require("../models/recipeModels");

class RecipesController {
  async getCattegory(req, res) {
    res.send("get cattegory");
  }

  async getForMain(req, res) {
    console.log("get for main");
    const result = await Recipe.find();
    res.json(result);
  }

  async getForCategory(req, res) {
    res.send("get for category");
  }

  async getOne(req, res) {
    res.send("get One recipe");
  }
}
module.exports = new RecipesController();
