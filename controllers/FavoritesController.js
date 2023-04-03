const Recipe = require("../models/recipeModels");
const { User } = require("../models/user");

const asyncHandler = require("express-async-handler");

class FavoritesController {
  async addFavorites(req, res) {
    const { _id: userId } = req.user;
    const { _id: recipeId } = req.body;

    const recipes = await Recipe.findById(recipeId);
    if (!recipes) {
      return res.status(404).json({
        code: 404,
        message: "Recipe not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: recipeId } },
      { new: true }
    );

    res.status(201).json({
      code: 201,
      message: "success",
      data: updatedUser,
    });
  }
  async getFavorites(req, res) {
    const { _id: id } = req.user;
    const favorites = await User.findById(id, {
      favorites: 1,
    });

    if (!favorites) {
      res.json({
        message: "No favorites have been added yet",
      });
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: favorites,
    });
  }
  async deleteFavorites(req, res) {
    const { id } = req.favorites;
    console.log("id", id);
    // const fivorites = await Recipe.findByIdAndRemove(id);
    // if (!fivorites) {
    //   throw HttpError(404, "Not found");
    // }
    // res.json({ message: "Fivorites deleted" });
  }
}

const favoritesCtrl = new FavoritesController();

module.exports = {
  addFavorites: asyncHandler(favoritesCtrl.addFavorites),
  getFavorites: asyncHandler(favoritesCtrl.getFavorites),
  deleteFavorites: asyncHandler(
    favoritesCtrl.deleteFavorites
  ),
};
