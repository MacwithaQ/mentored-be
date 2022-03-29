const mongoose = require("mongoose");
//* Auth / security:
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
//* Schema:
const Message = require("../../database/models/Message");

// new Message
//? Create New Message:
// exports.createMessage = async (req, res, next) => {
//   const newMessage = new Message(req.body);
//   try {
//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);
//   } catch (error) {
//     next(error);
//   }
// };

exports.fetchMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversation,
    }).populate("user");
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
