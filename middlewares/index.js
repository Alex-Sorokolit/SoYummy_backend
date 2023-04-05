const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const upload = require("./upload");
const passport = require("./google-authenticate");

module.exports = {
  validateBody,
  authenticate,
  upload,
  passport,
};
