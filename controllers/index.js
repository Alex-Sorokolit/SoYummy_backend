const controllers = require("./AuthController");

module.exports = {
  register: controllers.register,
  login: controllers.login,
  getCurrent: controllers.getCurrent,
  logout: controllers.logout,
  getCurrentUser: controllers.getCurrentUser,
  updateUser: controllers.updateUser,
  updateAvatar: controllers.updateAvatar,
  subscription: controllers.subscription,
};
