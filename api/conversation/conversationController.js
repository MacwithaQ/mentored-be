const mongoose = require("mongoose");
//* Auth / security:
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
//* Schema:
const Conversation = require("../../database/models/Conversation");
const Message = require("../../database/models/Message");

// new conv
//? Create New Conversation:
exports.createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    next(error);
  }
};

// new Message
//? Create New Message:
exports.createMessage = async (req, res, next) => {
  const { conversationId } = req.params;
  try {
    console.log(req.body);
    const foundConversation = await Conversation.findById(conversationId);
    const newMessage = await Message.create(req.body);
    await Conversation.findByIdAndUpdate(foundConversation._id, {
      $push: { messages: newMessage._id },
    });

    res.status(200).json(newMessage);
  } catch (error) {
    next(error);
  }
};
// fetch user convos
exports.fetchConversations = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {}
};
