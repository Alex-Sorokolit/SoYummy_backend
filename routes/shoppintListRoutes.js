//http://localhost:5000/api/v1/shopping-list
const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticate } = require("../middlewares");
const {
  shoppingCtrl: { addToShoppingList, deleteShopping, getShopping },
} = require("../controllers");

const shoppintListRouter = express.Router();

// Add product to cart
shoppintListRouter.patch(
  "/shopping-list/add",
  authenticate,
  asyncHandler(addToShoppingList)
);

// Remove product from cart
shoppintListRouter.patch(
  "/shopping-list/remove",
  authenticate,
  asyncHandler(deleteShopping)
);

// Get products list
shoppintListRouter.get(
  "/shopping-list",
  authenticate,
  asyncHandler(getShopping)
);

module.exports = shoppintListRouter;
