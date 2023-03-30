const mongoose = require("mongoose");
require("colors");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI);
    console.log(
      `mongodb is connected, dbName: ${db.connection.name}, onPort: ${db.connection.port}, onHost: ${db.connection.host}`
        .white.bold.bgGreen
    );
  } catch (error) {
    console.log(error.message.white.bgRed.bold);
    process.exit(1);
  }
};

module.exports = connectDb;
