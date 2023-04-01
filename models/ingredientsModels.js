const { model, Schema } = require("mongoose");

const ingredientSchema = Schema({}, { versionKey: false, timestamps: true });

module.exports = model("Ingredient", ingredientSchema);
