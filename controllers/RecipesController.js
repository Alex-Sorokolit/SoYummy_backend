const Recipe = require("../models/recipeModels");
const categories = require("../data/categories");

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
    console.log("get for main");
    // Цей запит спочатку сортує всі документи за полем category,
    // потім групує їх за значенням поля category і створює масив документів для кожної групи.
    // Потім, він обирає перші 4 елементи з кожного масиву документів і повертає результат.
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
    res.send("get for category");
  }

  async getOne(req, res) {
    res.send("get One recipe");
  }
}
module.exports = new RecipesController();

/* 
show dbs показує список баз даних
use db_soyummy  використовувати базу даних db_soyummy
show collections показує списо колекцій


help показує список команд для роботи із базами і колекціями
cls очищає консоль

find() шукати всі
find().limit(5)  повернути 5 документів
find({category: desert})  повернути всі з категорії desert
find().sort({title: 1})  повернути всі в алфавітному порядку
find({rating:{$gt:9}})  поверне всі фільми в яких рейтинг більше  9
find({rating:{$gte:9}})  поверне всі фільми в яких рейтинг більше або дорівнює  9
find({rating:{$lt:9}})  поверне всі фільми в яких рейтинг менше  9
find({rating:{$lte:9}})  поверне всі фільми в яких рейтинг менше або дорівнює 9
find({rating:{$eq:9}})  поверне всі фільми в яких рейтинг дорівнює 9
find({rating:{$ne:9}})  поверне всі фільми в яких рейтинг не дорівнює 9

find({rating:{$gte:9}, director: 'Quentin Tarantino' })  поверне всі фільми в яких рейтинг більше або дорівнює  9 режисера Quentin Tarantino
find({$or:[{director:Quentin Tarantino},{director: "Guy Ritchie"}]}) поверне фільми з які знімали Quentin Tarantino або Guy Ritchie
find({$or:[{director:Quentin Tarantino},{rating: 9.2}]}) поверне фільми з які знімали Quentin Tarantino або  в яких рейтинг 9.2

find({$and:[{director:Quentin Tarantino},{rating: 9.2}]}) поверне фільми з які знімав Quentin Tarantino і в яких рейтинг 9.2


find({rating: {$in:[ 7.8, 8.2, 8.3]}}) поверне всі фільми із вказаним рейтингом
find({rating: {$nin:[ 7.8, 8.2, 8.3]}}) поверне всі фільми в яких рейтинг відмінний від вказаних

find().pretty() виведе у вигляді json

find({rating: null}) покаже документи в яких (не пусте) а відсутнє поле rating 

find().skip(5) поверне всі фільми крім перших 5

db.movies.distinct('year')  поверне масив унікальних значень року
✅ db.movies.distinct('genres') поверне масив унікальних значень жанрів

find({}, {genres: {$slice: 1}}) поверне фільми в яких в полі жанр буде тільки под одному (першому) жанру
find({}, {genres: {$slice: -1}}) поверне фільми в яких в полі жанр буде тільки под одному (останньому) жанру


db.movies.drop() видаляє колекцію
*/
