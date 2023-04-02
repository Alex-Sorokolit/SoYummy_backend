const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();
const { User } = require("../models/user");

const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    const { subscription } = user;

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
  }

  async getCurrent(req, res) {
    const { email } = req.user;

    res.json({ email });
  }

  async logout(req, res) {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
      message: "Logout success",
    });
  }
}

const authCtrl = new AuthController();

module.exports = {
  register: ctrlWrapper(authCtrl.register),
  login: ctrlWrapper(authCtrl.login),
  getCurrent: ctrlWrapper(authCtrl.getCurrent),
  logout: ctrlWrapper(authCtrl.logout),
};
