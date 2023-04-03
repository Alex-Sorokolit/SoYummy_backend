const { model, Schema } = require("mongoose");

const recipeSchema = Schema(
  {
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
      enum: [
        "Beef",
        "Breakfast",
        "Chicken",
        "Dessert",
        "Goat",
        "Lamb",
        "Miscellaneous",
        "Pasta",
        "Pork",
        "Seafood",
        "Side",
        "Starter",
        "Vegan",
        "Vegetarian",
      ],
      required: [true, "db: category is required"],
    },
    time: {
      type: Number,
      required: [true, "db: time is required"],
    },

    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: {
      type: String,
      required: [true, "db: instruction is required"],
      minlength: 2,
      maxlength: 2000,
    },
    favorites: {
      type: Array,
      derault: [],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("recipe", recipeSchema);
