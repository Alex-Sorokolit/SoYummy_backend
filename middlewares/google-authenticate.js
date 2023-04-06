const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../models/user");

require("dotenv").config();

const { GOOGLE_ID, GOOGLE_SECRET } = process.env;

const googleParams = {
  clientID: GOOGLE_ID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: "https://soyummy-tw3y.onrender.com/api/v1/auth/google/callback",
  // callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;

    const user = await User.findOne({ email });

    if (user) {
      return done(null, user); // req.user = user
    }

    const password = await bcrypt.hash(uuidv4(), 10);

    const newUser = await User.create({ email, password, name: displayName });

    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
