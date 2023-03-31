const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cors = require("cors");
require("colors");

// отримуємо шлях до файлу .env
const configPath = path.join(__dirname, "config", ".env");
dotenv.config({ path: configPath });

// створення сервера
const app = express();

// Дозволяємо крос баузерні запити
app.use(cors());

// set routes
app.use("/api/v1", require("./routes/recipesRoutes"));

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

connectDb();
// отримуємо порт і запускаємо сервер
const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
  console.log(
    `server is running on port: , ${process.env.PORT}`.white.bgCyan.bold
  );
});
