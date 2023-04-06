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
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//When you choice your account, google use callback on this rout
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

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

// Subscription
authRouter.post(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  subscription
);

module.exports = authRouter;
