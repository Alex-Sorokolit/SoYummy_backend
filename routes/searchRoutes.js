//http://localhost:5000/api/v1/search
const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate } = require("../middlewares");

const {
  searchCtrl: { findByTitle, findByIngredient },
} = require("../controllers");

const searchRouter = express.Router();

// Search by Title
searchRouter.get("/search/by-title", authenticate, asyncHandler(findByTitle));

// Search by  Ingredients
searchRouter.get(
  "/search/by-ingredient",
  authenticate,
  asyncHandler(findByIngredient)
);

module.exports = searchRouter;
