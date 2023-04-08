//http://localhost:5000/api/v1/shopping-list
const express = require("express");
const shoppingListController = require("../controllers/ShoppingListController");

const { authenticate } = require("../middlewares");

const shoppintListRouter = express.Router();

// Add product to cart
//  створити ендпоінт для додавання продукту в список покупок користувача
shoppintListRouter.patch(
  "/shopping-list/add",
  authenticate,
  shoppingListController.addToShoppingList
);
// Remove product from cart
// створити ендпоінт для видалення продукту зі списку покупок користувача
shoppintListRouter.patch(
  "/shopping-list/remove",
  authenticate,
  shoppingListController.deleteShopping
);
// Get products list
// створити ендпоінт для отримання продуктів зі списку покупок користувача
shoppintListRouter.get(
  "/shopping-list",
  authenticate,
  shoppingListController.getShopping
);

module.exports = shoppintListRouter;
