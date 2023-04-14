const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate } = require("../middlewares");

const {
  popularCtrl: { getPopular },
} = require("../controllers");

const popularRecipeRouter = express.Router();

// Add to favorite
popularRecipeRouter.get(
  "/popular-recipes",
  authenticate,
  asyncHandler(getPopular)
);

module.exports = popularRecipeRouter;
