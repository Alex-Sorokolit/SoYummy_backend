//http://localhost:5000/api/v1/ingredients
const ingredientsController = require("../controllers/IngredientsController");

const express = require("express");

const ingredientsRouter = express.Router();

// Get ingredients-list
ingredientsRouter.get("/list", ingredientsController.getIngredientsList);

module.exports = ingredientsRouter;
