//http://localhost:5000/api/v1/search
const express = require("express");
const {
  findByTitle,
  findByIngredient,
} = require("../controllers/SearchController");
const searchRouter = express.Router();

// Search by Title or Ingredients
searchRouter.get("/search/by-title", findByTitle);
module.exports = searchRouter;

searchRouter.get("/search/by-ingredient", findByIngredient);
module.exports = searchRouter;
