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

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      token,
      avatarURL,
    });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      token: newUser.token,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "23h",
      }
    );

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email,
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

  async getCurrentUser(req, res) {
    const { name, email, avatarURL, createdAt } = req.user;

    res.status(200).json({
      name,
      email,
      avatarURL,
      createdAt,
    });
  }

  async updateUser(req, res) {
    const { _id: id } = req.user;

    const data = req.body;

    if (data.password) {
      const hashPassword = await bcrypt.hash(
        data.password,
        10
      );

      await User.findByIdAndUpdate(id, {
        password: hashPassword,
      });

      res.status(200).json({
        message: "Password update",
      });
      return;
    }

    const { name, email, avatarURL, updatedAt } =
      await User.findByIdAndUpdate(id, data, {
        new: true,
      });

    res
      .status(200)
      .json({ name, email, avatarURL, updatedAt });
  }

  async updateAvatar(req, res) {
    const { _id: id } = req.user;

    const { path } = req.file;

    await User.findByIdAndUpdate(id, { avatarURL: path });

    res.status(200).json({ avatarURL: path });
  }
}

const authCtrl = new AuthController();

module.exports = {
  register: ctrlWrapper(authCtrl.register),
  login: ctrlWrapper(authCtrl.login),
  getCurrent: ctrlWrapper(authCtrl.getCurrent),
  logout: ctrlWrapper(authCtrl.logout),
  getCurrentUser: ctrlWrapper(authCtrl.getCurrentUser),
  updateUser: ctrlWrapper(authCtrl.updateUser),
  updateAvatar: ctrlWrapper(authCtrl.updateAvatar),
};
