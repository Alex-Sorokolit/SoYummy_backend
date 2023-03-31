const { model, Schema } = require("mongoose");

const recipeSchema = Schema({
  title: {
    type: String,
    required: [true, "db: title is required"],
  },
  description: {
    type: String,
    required: [true, "db: description is required"],
  },
  category: {
    type: String,
    required: [true, "db: category is required"],
  },
  time: {
    type: Number,
    required: [true, "db: time is required"],
  },
  ingredients: {
    type: Array,
    default: [],
  },
  instructions: {
    type: String,
    required: [true, "db: instruction is required"],
  },
  favorites: {
    type: Array,
    default: [],
  },
  // owner,
});

module.exports = model("Recipe", recipeSchema);
