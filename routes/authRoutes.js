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
  subscription,
  googleAuth,
} = require("../controllers");

const authRouter = express.Router();

const {
  validateBody,
  authenticate,
  upload,
  passport,
} = require("../middlewares");

// Route from front-end when press btn for google registration
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//When you choice your account, google use callback on this rout
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

// Registration  (signup)
authRouter.post(
  "/auth/register",
  validateBody(schemas.registerSchema),
  register
);

// LogIn (signin)
authRouter.post("/auth/login", validateBody(schemas.loginSchema), login);

// Get current user
authRouter.get("/auth/current", authenticate, getCurrent);

// Get info about user
authRouter.get("/auth/user/info", authenticate, getCurrentUser);

// Update user fields
authRouter.put(
  "/auth/user/update",
  authenticate,
  validateBody(schemas.updateUserSchema),
  updateUser
);

// LogOut
authRouter.post("/auth/logout", authenticate, logout);

// Update users avatar
authRouter.patch(
  "/auth/user/avatar",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

// Subscription
authRouter.post(
  "/auth/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  subscription
);

module.exports = authRouter;
