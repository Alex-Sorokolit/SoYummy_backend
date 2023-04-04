const { User } = require("../models/user");
const Recipe = require("../models/recipeModels");
const asyncHandler = require("express-async-handler");

class PopularController {
  async getFavorites(req, res) {
    const users = await User.find().populate("favorites");
    const recipeCounts = {};
    for (const user of users) {
      for (const favorite of user.favorites) {
        if (recipeCounts[favorite]) {
          recipeCounts[favorite]++;
        } else {
          recipeCounts[favorite] = 1;
        }
      }
    }
    const sortedRecipes = Object.entries(recipeCounts).sort(
      ([_, count1], [__, count2]) => count2 - count1
    );
    const popularRecipes = await Recipe.find()
      .where("_id")
      .in(sortedRecipes.slice(0, 4).map(([recipeId]) => recipeId && recipeId.trim()))
      .exec();
    res.status(200).json({
      code: 200,
      message: "Received the most popular recipes",
      data: popularRecipes,
    });
  }
}

const popularCtrl = new PopularController();

module.exports = {
  getFavorites: asyncHandler(popularCtrl.getFavorites),
};
