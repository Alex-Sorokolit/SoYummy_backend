//http://localhost:5000/api/v1/auth
const express = require("express");
const { schemas } = require("../models/user");

const { register, login } = require("../controllers");

const authRouter = express.Router();

const validateBody = require("../middlewars/validateBody");

// Registration  (signup)
// validateBody(schemas.registerSchema),
authRouter.post("/register", validateBody(schemas.registerSchema), register);

// LogIn (signin)
authRouter.post("/login", validateBody(schemas.loginSchema), login);

// 🟨Написати прошарок авторизації  (хз що це)

// Get info about user
// створити ендпоінт на отримання інформації про користувача

// Refresh
// створити ендпоінт для оновлення данних користувача або одного з полів контактної інформації про користувача

// LogOut
// створити ендпоінт для логаута користувача

module.exports = authRouter;
