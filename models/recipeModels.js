const { model, Schema } = require("mongoose");
const Joi = require("joi");

const categoriesList = [
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
];
// mongoos схема перевіряє дані які зберігаються в базу даних
const recipeSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "DB: title is required"],
    },
    description: {
      type: String,
      required: [true, "DB: description is required"],
    },
    instructions: {
      type: String,
      required: [true, "DB: instruction is required"],
      minlength: 2,
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: categoriesList,
      required: [true, "DB: category is required"],
    },
    time: {
      type: Number,
      required: [true, "DB: time is required"],
    },
    ingredients: [
      {
        _id: {
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
    // favorites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    favorites: {
      type: Array,
      default: [],
    },
    thumb: {
      type: String,
      // required: true,
    },
    preview: {
      type: String,
      // required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true }, // тут буде зберігатися id користувача який додав контакт у базу, ref це колекція
  },
  { versionKey: false, timestamps: true }
);

// валідація Joy перевіряє тіло запиту
const recipeJoiSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Joi: Title is required",
    "string.empty": "Joi: Title cannot be empty",
  }),
  description: Joi.string().required().messages({
    "any.required": "Joi: Description is required",
    "string.empty": "Joi: Description cannot be empty",
  }),
  category: Joi.string()
    .valid(...categoriesList)
    .required()
    .messages({
      "any.required": "Joi: Category is required",
      "string.empty": "Joi: Category cannot be empty",
      "any.only": "Category must be one of the allowed values",
    }),
  time: Joi.number().required().messages({
    "any.required": "Joi: Time is required",
    "number.empty": "Joi: Time cannot be empty",
  }),

  ingredients: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().hex().length(24).message("ingredient id not valid"),
        measure: Joi.string(),
      })
    )
    .required()
    .messages({
      "any.required": "Joi: Ingredients are required",
      "array.empty": "Joi: Ingredients cannot be empty",
    }),
  instructions: Joi.string().required().min(2).max(2000).messages({
    "any.required": "Joi: Instructions are required",
    "string.empty": "Joi: Instructions cannot be empty",
    "string.min": "Joi: Instructions must be at least 2 characters long",
    "string.max": "Joi: Instructions cannot be longer than 2000 characters",
  }),
  favorites: Joi.array().default([]),
}).options({ abortEarly: false, stripUnknown: true });

const Recipe = model("Recipe", recipeSchema);

const schemas = {
  recipeJoiSchema,
};

module.exports = {
  Recipe,
  schemas,
};

// const recipe = await Recipe.aggregate([
//   {
//     $match: {
//       _id: ObjectId("640cd5ac2d9fecf12e8897f5"),
//     },
//   },
//   {
//     $lookup: {
//       from: "ingredients",
//       localField: "ingredients.id",
//       foreignField: "_id",
//       as: "ingr_nfo",
//     },
//   },
//   {
//     $set: {
//       ingredients: {
//         $map: {
//           input: "$ingredients",
//           in: {
//             $mergeObjects: [
//               "$$this",
//               {
//                 $arrayElemAt: [
//                   "$ingr_nfo",
//                   {
//                     $indexOfArray: ["$ingr_nfo._id", "$$this.id"],
//                   },
//                 ],
//               },
//             ],
//           },
//         },
//       },
//     },
//   },
//   {
//     $unset: ["ingr_nfo", "ingredients.id"],
//   },
// ]).pretty();
