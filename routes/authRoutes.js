//http://localhost:5000/api/v1/auth
const express = require("express");
const { schemas } = require("../models/user");

const { register, login, getCurrent, logout } = require("../controllers");

const authRouter = express.Router();

const { validateBody, authenticate } = require("../middlewares");

// Registration  (signup)
// validateBody(schemas.registerSchema),
authRouter.post("/register", validateBody(schemas.registerSchema), register);

// LogIn (signin)
authRouter.post("/login", validateBody(schemas.loginSchema), login);

// Get current user
authRouter.get("/current", authenticate, getCurrent);

// 🟨Написати прошарок авторизації  (хз що це)

// Get info about user
// створити ендпоінт на отримання інформації про користувача

// Refresh
// створити ендпоінт для оновлення данних користувача або одного з полів контактної інформації про користувача

// LogOut
authRouter.post("/logout", authenticate, logout);

module.exports = authRouter;
