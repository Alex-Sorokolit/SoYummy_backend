const Recipe = require("../models/recipeModels");
const { User } = require("../models/user");

const asyncHandler = require("express-async-handler");

class FavoritesController {
  async addFavorites(req, res) {
    const { _id: userId } = req.user;
    const { _id: recipeId } = req.body;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        code: 404,
        message: "Recipe not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: recipeId } },
      { new: true }
    ).populate("favorites");

    res.status(201).json({
      code: 201,
      message: "success",
      data: updatedUser.favorites,
    });
  }
  async getFavorites(req, res) {
    const { _id: userId } = req.user;

    const user = await User.findById(userId).populate({
      path: "favorites",
      model: "Recipe",
    });

    const favoriteRecipes = user.favorites;

    if (!favoriteRecipes) {
      res.json({
        message: "No favorites have been added yet",
      });
    }

    res.status(200).json({
      code: 200,
      message: "success",
      data: favoriteRecipes,
      quantity: favoriteRecipes.length,
    });
  }

  async deleteFavorites(req, res) {
    const { _id: userId } = req.user;
    const { id: recipeId } = req.params;
    console.log("recipeId", recipeId);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: recipeId } },
      { new: true }
    ).populate("favorites");
    if (!recipeId) {
      res.json({
        message: "There is no such recipe here anymore",
      });
    }
    res.status(200).json({
      code: 200,
      message: "Fivorites deleted",
      data: updateUser.favorites,
    });
  }
}

const favoritesCtrl = new FavoritesController();

module.exports = {
  addFavorites: asyncHandler(favoritesCtrl.addFavorites),
  getFavorites: asyncHandler(favoritesCtrl.getFavorites),
  deleteFavorites: asyncHandler(favoritesCtrl.deleteFavorites),
};
