const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;

  // якщо id не валідний, створюємо помилку
  if (!isValidObjectId(id)) {
    res.status(400);
    throw new Error(`${id} is not valid id`);
  }

  // якщо валідний id то йдемо далі
  next();
};

module.exports = isValidId;
