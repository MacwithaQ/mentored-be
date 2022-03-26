const express = require("express");
const passport = require("passport");
const { createMessage, fetchMessages } = require("./messageController");

//? Set Router
const messageRouter = express.Router();

//? Assign Router to Controllers
messageRouter.post("/", createMessage);
messageRouter.get("/:conversationId", fetchMessages);

module.exports = messageRouter;
