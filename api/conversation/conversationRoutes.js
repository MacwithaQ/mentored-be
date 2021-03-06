const express = require("express");
const passport = require("passport");
const {
  fetchConversations,
  createConversation,
  createMessage,
} = require("./conversationController");

//? Set Router
const conversationRouter = express.Router();

//? Assign Router to Controllers
conversationRouter.post("/", createConversation);
conversationRouter.get("/:userId", fetchConversations);
conversationRouter.post("/:conversationId", createMessage);

module.exports = conversationRouter;
