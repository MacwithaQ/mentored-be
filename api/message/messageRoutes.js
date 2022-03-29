const express = require("express");
const passport = require("passport");
const { createMessage, fetchMessages } = require("./messageController");

//? Set Router
const messageRouter = express.Router();

//? Assign Router to Controllers
messageRouter.get("/:conversation", fetchMessages);

module.exports = messageRouter;
