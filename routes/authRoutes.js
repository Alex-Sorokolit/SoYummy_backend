//http://localhost:5000/api/v1/auth
const express = require("express");
const { schemas } = require("../models/user");

const {
  register,
  login,
  getCurrent,
  logout,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require("../controllers");

const authRouter = express.Router();

const { validateBody, authenticate, upload } = require("../middlewares");

// Registration  (signup)
authRouter.post("/register", validateBody(schemas.registerSchema), register);

// LogIn (signin)
authRouter.post("/login", validateBody(schemas.loginSchema), login);

// Get current user
authRouter.get("/current", authenticate, getCurrent);

// Get info about user
authRouter.get("/user/info", authenticate, getCurrentUser);

// Update user fields
authRouter.put(
  "/user/update",
  authenticate,
  validateBody(schemas.updateUserSchema),
  updateUser
);

// LogOut
authRouter.post("/logout", authenticate, logout);

// Update users avatar
authRouter.patch(
  "/user/avatar",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = authRouter;
