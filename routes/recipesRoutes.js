//http://localhost:5000/api/v1/recipes

const express = require("express");

const recipesRouter = express.Router();

// Get category-list /recipes/category-list
// створити ендпоінт для отримання списку категорій. Cписок категорій 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian' Відсортували по алфавіту

// Get main-page recipes by category /recipes/main-page
// створити ендпоінт для отримання рецептів по категоріям для головної сторінки

// Get 8 recipes by category  /recipes/:category
//  створити ендпоінт для отримання рецептів по категоріям по 8 рецептів.

// Get recipe by ID /recipes/:id
// /recipes/:id - створити ендпоінт для отримання одного рецепта по id

// Get by recipe title /search
// створити ендпоінт для пошуку рецептів по ключовому слову в заголовку, або по інгрідієнту з данними для реалізації пагінації у відповіді

module.exports = recipesRouter;
