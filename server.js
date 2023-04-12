const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const {
  authRouter,
  recipesRouter,
  ingredientsRouter,
  searchRouter,
  shoppintListRouter,
  popularRecipeRouter,
  ownRecipesRouter,
  favoritesRouter,
} = require("./routes");

require("colors");
require("dotenv").config();

// створення сервера
const app = express();

// middelwares ______________________________
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Дозволяємо крос баузерні запити
app.use(cors());

// set routes ________________________________
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", recipesRouter);
app.use("/api/v1", ownRecipesRouter);
app.use("/api/v1", ingredientsRouter);
app.use("/api/v1", searchRouter);
app.use("/api/v1", shoppintListRouter);
app.use("/api/v1", favoritesRouter);
app.use("/api/v1", popularRecipeRouter);

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
