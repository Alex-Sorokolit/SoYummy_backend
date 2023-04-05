const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRouter = require("./routes/authRoutes");
const recipesRouter = require("./routes/recipesRoutes");
const ingredientsRouter = require("./routes/ingredientsRoutes");
const searchRouter = require("./routes/searchRoutes");
const popularRecipeRouter = require("./routes/popularRecipeRoutes");
// const ownRecipesRouter = require("./routes/ownRecipesRoutes");

const favoritesRouter = require("./routes/favoritesRoutes");

require("colors");
require("dotenv").config();
// отримуємо шлях до файлу .env
const configPath = path.join(__dirname, "config", ".env");
dotenv.config({ path: configPath });

// створення сервера
const app = express();

// middelwares ______________________________
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Дозволяємо крос баузерні запити
app.use(cors());

// set routes ________________________________
app.use("/api/v1", recipesRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/ingredients", ingredientsRouter);
app.use("/api/v1", searchRouter);
app.use("/api/v1", favoritesRouter);
app.use("/api/v1", popularRecipeRouter);
// app.use("./api/v1", ownRecipesRouter);

// Catch Errors ______________________________
// обробка помилки 404

app.use("*", (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not found",
  });
});

// відловлювач всіх не передбачених помилок
app.use((error, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({ code: res.statusCode, message: error.message });
});

// Підключаємось до бази даних
connectDb();
// отримуємо порт і запускаємо сервер
const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
  console.log(
    `server is running on port: , ${process.env.PORT}`.white.bgCyan.bold
  );
});
