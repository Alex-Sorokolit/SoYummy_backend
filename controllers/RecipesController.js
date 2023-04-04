const Recipe = require("../models/recipeModels");
const categories = require("../data/categories");
const asyncHandler = require("express-async-handler"); // дозволяє відловлювати помилки (модний try catch)

class RecipesController {
  async getCattegory(req, res) {
    res.status(200).json({
      code: 200,
      message: "success",
      data: categories,
      quantity: categories.length,
    });
  }

  async getForMain(req, res) {
    const result = await Recipe.aggregate([
      { $sort: { category: 1 } },
      { $group: { _id: "$category", documents: { $push: "$$ROOT" } } },
      { $project: { documents: { $slice: ["$documents", 4] } } },
    ]);
    if (!result) {
      res.status(400);
      throw new Error("Bad Request");
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
    });
  }

  async getForCategory(req, res) {
    const { category } = req.params;

    if (!categories.find((item) => item === category)) {
      res.status(404);
      throw new Error(`Category ${category} not found`);
    }

    const result = await Recipe.find({ category: `${category}` }).sort({
      createdAt: -1,
    });

    if (!result) {
      res.status(404);
      throw new Error(`Category ${category} not found`);
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
    });
  }

  async getOne(req, res) {
    const { id } = req.params;
    const result = await Recipe.findById(id).populate({
      path: "ingredients._id",
      model: "Ingredient",
    });

    if (!result) {
      res.status(404);
      throw new Error(`Recipe with id=${id} not found`);
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      quantity: result.length,
    });
  }
}
const recipeCtrl = new RecipesController();

module.exports = {
  getCattegory: asyncHandler(recipeCtrl.getCattegory),
  getForMain: asyncHandler(recipeCtrl.getForMain),
  getForCategory: asyncHandler(recipeCtrl.getForCategory),
  getOne: asyncHandler(recipeCtrl.getOne),
};

/* 
⏺ Базові команди ______________________________
help показує список команд для роботи із базами і колекціями
cls очищає консоль

show dbs показує список баз даних
show collections показує список колекцій
use db_soyummy  використовувати базу даних db_soyummy 
після цієї команди можна звертитись до бази як db.recipes.find()
db.cats.stats(); статистика колекції cats
find().pretty() виведе у вигляді json
db.movies.drop() видаляє колекцію
db.cats.count(); кількість документів у колекції

⏺ Додавання ______________________________
Додасть документи в колекцію cats
db.cats.insertOne({
  name: 'barsik',
  age: 3,
  features: ['ходить у тапки', 'дає себе гладити', 'рудий'],
}); 

Додасть кілька документів у колекцію cats
db.cats.insertMany([
  {
    name: 'Lama',
    age: 2,
    features: ['ходить у лоток', 'не дає себе гладити', 'сірий'],
  },
  {
    name: 'Liza',
    age: 4,
    features: ['ходить у лоток', 'дає себе гладити', 'білий'],
  },
]);

Може додавати один або кілька документів
db.cats.insert([
  {
    name: 'Boris',
    age: 12,
    features: ['ходить у лоток', 'не дає себе гладити', 'сірий'],
  },
  {
    name: 'Murzik',
    age: 1,
    features: ['ходить у лоток', 'дає себе гладити', 'чорний'],
  },
]);

⏺ Пошук _______________________________________________
db.cats.find(); Буде шукати всі документи в колекцію cats
find() шукати всі
find().limit(5)  повернути 5 перших документів
db.cats.find().skip(3); пропустити 3 перші документи у вибірці, решту повернути
✅find({category: desert})  повернути всі з категорії desert
find().sort({title: 1})  повернути всі в алфавітному порядку
db.cats.find().sort({ name: 1 }); повернути всі в алфавітному порядку

$eq (дорівнює)
$gt (більше ніж)
$lt (менше ніж)
$gte (більше або дорівнює)
$lte (менше або дорівнює)

find({rating:{$gt:9}})  поверне всі фільми в яких рейтинг більше  9
find({rating:{$gte:9}})  поверне всі фільми в яких рейтинг більше або дорівнює  9
find({rating:{$lt:9}})  поверне всі фільми в яких рейтинг менше  9
find({rating:{$lte:9}})  поверне всі фільми в яких рейтинг менше або дорівнює 9
find({rating:{$eq:9}})  поверне всі фільми в яких рейтинг дорівнює 9
find({rating:{$ne:9}})  поверне всі фільми в яких рейтинг не дорівнює 9

⏺ Пошук у вкладених полях

db.cats.find({ 'owners.name': 'Nata' }); поверне документи в яких у owners.name буде Nata

{
  "_id": ObjectId("5f838b225ba83a4f1829ca60"),
  "name": "Dariy",
  "age": 10.0,
  "features": ["ходить у лоток", "не дає себе гладити", "сірий"],
  "owners": {
    "name": "Nata",
    "age": 23.0,
    "address": "Poltava"
  }
}

⏺ Проекція (виключення непотрібних полів документа)
db.cats.find({ age: { $lte: 3 }, features: 'дає себе гладити' }, { name: 0 }); не буде повертати поле name
Поверне тільки поля age name (_id неможливо виключити)
db.cats.find(
  { age: { $lte: 3 }, features: 'дає себе гладити' },
  { name: 1, age: 1 },
);

⏺ Оператори _______________________________________
Оператор $exists дозволяє витягти тільки ті документи, в яких певний ключ присутній або відсутній.
db.cats.find({ owners: { $exists: true } });

Оператор $type витягує лише ті документи, у яких визначений ключ має значення певного типу, наприклад, рядок чи число
db.cats.find({ age: { $type: 'number' } });

Оператор $regex задає регулярний вираз, якому має відповідати значення поля.
db.cats.find({ name: { $regex: 'L' } });

Оператор логічного множення $or, дозволяє об'єднати вибірки
db.cats.find({ $or: [{ name: { $regex: 'L' } }, { age: { $lte: 3 } }] });

Оператор логічного множення $and, знаходить перетин вибірок
db.cats.find({ $and: [{ name: { $regex: 'L' } }, { age: { $lte: 3 } }] });

⏺ Комбіновані запити _______________________________________
find({rating:{$gte:9}, director: 'Quentin Tarantino' })  поверне всі фільми в яких рейтинг більше або дорівнює  9 режисера Quentin Tarantino
find({$or:[{director:Quentin Tarantino},{director: "Guy Ritchie"}]}) поверне фільми з які знімали Quentin Tarantino або Guy Ritchie
find({$or:[{director:Quentin Tarantino},{rating: 9.2}]}) поверне фільми з які знімали Quentin Tarantino або  в яких рейтинг 9.2
find({$and:[{director:Quentin Tarantino},{rating: 9.2}]}) поверне фільми з які знімав Quentin Tarantino і в яких рейтинг 9.2
find({rating: {$in:[ 7.8, 8.2, 8.3]}}) поверне всі фільми із вказаним рейтингом
find({rating: {$nin:[ 7.8, 8.2, 8.3]}}) поверне всі фільми в яких рейтинг відмінний від вказаних
find({rating: null}) покаже документи в яких (не пусте) а відсутнє поле rating 
find().skip(5) поверне всі фільми крім перших 5


⏺ Унікальні значення _______________________________________
db.movies.distinct('year')  поверне масив унікальних значень року
db.movies.distinct('genres') поверне масив унікальних значень жанрів

find({}, {genres: {$slice: 1}}) поверне фільми в яких в полі жанр буде тільки под одному (першому) жанру
find({}, {genres: {$slice: -1}}) поверне фільми в яких в полі жанр буде тільки под одному (останньому) жанру

⏺ Складні запити __________________________________________
✅.aggregate([
      { $sort: { category: 1 } },
      { $group: { _id: "$category", documents: { $push: "$$ROOT" } } },
      { $project: { documents: { $slice: ["$documents", 4] } } },
    ]);

    Цей запит спочатку сортує всі документи за полем category, потім групує їх за значенням поля category і створює масив документів для кожної групи.Потім, він обирає перші 4 елементи з кожного масиву документів і повертає результат.
*/
