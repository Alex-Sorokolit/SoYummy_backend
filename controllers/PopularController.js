const { Recipe } = require("../models/recipe");

class PopularController {
  async getPopular(req, res) {
    const recipeCounts = {};
    const popularRecipesCount = 4;

    // Обчислюємо кількість улюблених рецептів для кожного рецепта
    const results = await Recipe.aggregate([
      { $unwind: "$favorites" },
      { $group: { _id: "$_id", count: { $sum: 1 } } },
    ]);

    // Зберігаємо результати у змінну recipeCounts
    results.forEach(({ _id, count }) => (recipeCounts[_id] = count));

    // Сортуємо рецепти за кількістю улюблень
    const sortedRecipes = Object.entries(recipeCounts).sort(
      ([_, count1], [__, count2]) => count2 - count1
    );

    // Вибираємо найпопулярніші рецепти
    const popularRecipes = await Recipe.find()
      .where("_id")
      .in(
        sortedRecipes
          .slice(0, popularRecipesCount)
          .map(([recipeId]) => recipeId && recipeId.trim())
      )
      .exec();

    res.status(200).json({
      code: 200,
      message: "Received the most popular recipes",
      data: popularRecipes,
    });
  }
}

const popularCtrl = new PopularController();

module.exports = popularCtrl;
