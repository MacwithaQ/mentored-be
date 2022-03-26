const express = require("express");
const passport = require("passport");
const {
  fetchConversations,
  createConversation,
} = require("./conversationController");

//? Set Router
const conversationRouter = express.Router();

//? Assign Router to Controllers
// conversationRouter.get("/", fetchConversations);
conversationRouter.post("/", createConversation);
conversationRouter.get("/:userId", fetchConversations);

module.exports = conversationRouter;
