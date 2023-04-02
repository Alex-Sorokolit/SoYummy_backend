const { model, Schema } = require("mongoose");

const ingredientSchema = Schema(
  {
    ttl: {
      type: String,
      required: [true, "db: ttl is required"],
    },
    desc: {
      type: String,
    },
    t: {
      type: String,
    },
    tnd: {
      type: String,
      required: [true, "db: tnd is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Ingredient", ingredientSchema);
