//http://localhost:5000/api/v1/search
const express = require("express");
const { find } = require("../controllers/SearchController");
const searchRouter = express.Router();

// Search by Title or Ingredients
searchRouter.get("/search", find);
module.exports = searchRouter;
