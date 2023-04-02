//http://localhost:5000/api/v1/search
const express = require("express");
const { find } = require("../controllers/SearchController");
const searchRouter = express.Router();

// Search by title
// створити ендпоінт для пошуку рецептів по ключовому слову в заголовку, або по інгрідієнту з данними для реалізації пагінації у відповіді
searchRouter.get("/search", find);
module.exports = searchRouter;
