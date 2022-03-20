const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");
const User = require("../database/models/User");
const bcrypt = require("bcrypt");

// Using passport to verify user and password
exports.localStrategy = new LocalStrategy(async (user, password, done) => {
  try {
    const foundUser = await User.findOne({ email: user });
    const isPasswordMatch = foundUser
      ? await bcrypt.compare(password, foundUser.password)
      : false;
    if (isPasswordMatch) return done(null, foundUser);
    const error = {
      message: "Unauthorized",
      status: 401,
    };
    return done(error);
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
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      done(error);
    }
  }
);
