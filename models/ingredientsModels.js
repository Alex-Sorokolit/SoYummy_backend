const { model, Schema } = require("mongoose");

const ingredientSchema = Schema(
  {
    ttl: {
      type: String,
      required: [true, "db: ttl is required"],
    },
    desc: {
      type: String,
      required: [true, "db: desc is required"],
    },
    t: {
      type: String,
      required: [true, "db: t is required"],
    },
    tnd: {
      type: String,
      required: [true, "db: tnd is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Ingredient", ingredientSchema);
