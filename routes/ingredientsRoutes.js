//http://localhost:5000/api/v1/ingredients
const ingredientsController = require("../controllers/IngredientsController");

const express = require("express");

const ingredientsRouter = express.Router();

// Get ingredients-list /ingredients/list
// створити ендпоінт  для отримання списку інгрієнтів
ingredientsRouter.get(
  "/ingredients/list",
  ingredientSchema,
  ingredientsController.getIngredient
);
// Get ingredients-list /ingredients/list
// створити ендпоінт  для отримання списку інгрієнтів
//створити ендпоінт для пошуку рецептів по інгрідієнту
ingredientsRouter.get(
  "/ingredients",
  ingredientSchema,
  ingredientsController.getForIngredient
);

module.exports = ingredientsRouter;
