const mongoose = require("mongoose");
//* Auth / security:
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
//* Schema:
const User = require("../../database/models/User");
const Mentor = require("../../database/models/Mentor");
const Student = require("../../database/models/Student");

//? FETCH-ONE-USER:
exports.fetchOneUser = async (userId, next) => {
  try {
    const user = await User.findById(userId);

    if (user) return user;
    else {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//? FETCH USERS:
exports.fetchUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate("studentProfile")
      .populate("mentorProfile");

    return res.json(users);
  } catch (error) {
    next(error);
  }
};

//? UPDATE-USER:
exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      //* FOR IMAGE USE :
      req.body.image = `/${req.file.path}`;
      // req.body.image = req.body.image.replace("\\", "/");
    }

    const userId = req.user._id; //* Take the id.
    const user = req.body; //* Take all the body.

    //* FIND & UPDATE:
    const userUpdated = await User.findByIdAndUpdate(userId, user, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "User Updated", payload: userUpdated });
  } catch (error) {
    next(error);
  }
};

//? SIGN-UP:
exports.signup = async (req, res, next) => {
  try {
    console.log("body", req.body);
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      password: req.body.password,
      email: req.body.email,
      isMentor: req.body.isMentor,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      image: "",
    });

    if (newUser) {
      if (newUser.isMentor === true) {
        const newMentor = await Mentor.create({
          user: newUser._id,
          major: req.body.major,
          employer: req.body.employer,
          bio: "",
        });
        newUser.mentorProfile = newMentor;

        await User.findByIdAndUpdate(newUser._id, newUser, {
          runValidators: true,
          new: true,
        });

        // mentor profile
        const payload = {
          _id: newUser._id,
          email: newUser.email,
          isMentor: newUser.isMentor,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phone: newUser.phone,
          image: newUser.image,
          mentorProfile: newMentor,
          exp: Date.now() + JWT_EXPIRATION_MS,
        };

        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

        res.status(201).json({ token });
      } else {
        const newStudent = await Student.create({
          user: newUser._id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          educationLevel: req.body.educationLevel,
          guardian: req.body.guardian,
          phone: req.body.phone,
          gPhone: req.body.gPhone,
          image: "",
        });

        newUser.studentProfile = newStudent;

        await User.findByIdAndUpdate(newUser._id, newUser, {
          runValidators: true,
          new: true,
        });

        const payload = {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phone: newUser.phone,
          image: newUser.image,
          email: newUser.email,
          isMentor: newUser.isMentor,
          studentProfile: newStudent,
          exp: Date.now() + JWT_EXPIRATION_MS,
        };

        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

        res.status(201).json({ token });
      }
    }

    // TODO: make functions to shorten the signup function
  } catch (error) {
    next(error);
  }
};

//? SIGN-IN:
exports.signin = async (req, res, next) => {
  try {
    const user = req.user;

    const mentorProfile = await Mentor.findById(user.mentorProfile);
    const studentProfile = await Student.findById(user.studentProfile);

    if (user.isMentor) {
      const payload = {
        _id: user._id,
        email: user.email,
        isMentor: user.isMentor,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        mentorProfile: mentorProfile,
        exp: Date.now() + JWT_EXPIRATION_MS,
      };
      const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

      res.status(201).json({ token });
      console.log(mentorProfile);
    } else {
      const payload = {
        _id: user._id,
        email: user.email,
        isMentor: user.isMentor,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        studentProfile: studentProfile,
        exp: Date.now() + JWT_EXPIRATION_MS,
      };
      const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

      res.status(201).json({ token });
    }
  } catch (error) {
    console.log(error);
  }
};
