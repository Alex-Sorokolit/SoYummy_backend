class RecipesController {
  getCattegory(req, res) {
    res.send("get cattegory");
  }

  getForMain(req, res) {
    res.send("get ForMain");
  }

  getForCategory(req, res) {
    res.send("get for category");
  }

  getOne(req, res) {
    res.send("get ForMain");
  }
}
module.exports = new RecipesController();
