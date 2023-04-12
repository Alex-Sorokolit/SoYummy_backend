//http://localhost:5000/api/v1/favorite
const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate } = require("../middlewares");
const {
  favoritesCtrl: { addFavorites, getFavorites, deleteFavorites },
} = require("../controllers");

const favoritesRouter = express.Router();

// Add to favorite
favoritesRouter.post("/favorites", authenticate, asyncHandler(addFavorites));

// get favorites
favoritesRouter.get("/favorites", authenticate, asyncHandler(getFavorites));

// remove from favorites
favoritesRouter.delete(
  "/favorites/:id",
  authenticate,
  asyncHandler(deleteFavorites)
);

module.exports = favoritesRouter;
