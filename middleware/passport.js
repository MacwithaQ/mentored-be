const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const { now } = require("mongoose");

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    passwordsMatch ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) return done(null, false);
    try {
      const user = await User.findById(jwtPayload._id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
