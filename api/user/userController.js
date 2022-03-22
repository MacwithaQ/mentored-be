const mongoose = require("mongoose");
const User = require("../../database/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const Mentor = require("../../database/models/Mentor");
const Student = require("../../database/models/Student");

exports.fetchUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    console.log("body", req.body);
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(req.body);

    // if New User Create Profile
    if (newUser) {
      // if the user is MENTOR create mentor profile - AlKhareji
      if (newUser.isMentor === true) {
        console.log("is mentor?");
        const profile = {
          user: newUser._id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          major: req.body.major,
          employer: req.body.employer,
          bio: req.body.bio,
          image: "",
        };
        console.log("mentor profile:", profile);
        await Mentor.create(profile);
      }
      // else the user is Student. So, create student profile - AlKhareji
      else {
        console.log("is student?");
        const profile = {
          user: newUser._id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          educationLevel: req.body.educationLevel,
          guardian: req.body.guardian,
          gPhone: req.body.gPhone,
          image: "",
        };
        console.log("student profile:", profile);
        await Student.create(profile);
      }
    }

    const payload = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      isMentor: newUser.isMentor,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  try {
    const user = req.user;

    const payload = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isMentor: user.isMentor,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
  }
};
