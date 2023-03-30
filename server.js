const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
require("colors");

// отримуємо шлях до файлу .env
const configPath = path.join(__dirname, "config", ".env");
dotenv.config({ path: configPath });

// створення сервера
const app = express();

connectDb();

// отримуємо порт і запускаємо сервер
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(
    `server is running on port: , ${process.env.PORT}`.white.bgCyan.bold
  );
});

// test
