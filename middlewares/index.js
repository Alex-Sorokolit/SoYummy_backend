const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const upload = require("./upload");
const passport = require("./google-authenticate");
const isValidId = require("./isValidId");
// const imageUpload = require("./imageUpload");
const uploadCloud = require("./imageUpload");

module.exports = {
  validateBody,
  authenticate,
  upload,
  passport,
  isValidId,
  // imageUpload,
  uploadCloud,
};
