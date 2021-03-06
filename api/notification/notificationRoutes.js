const express = require("express");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const {
  saveToken,
  handlePushTokens,
  fetchTokens,
} = require("./notificationController");

//? Set Router
const notificationsRouter = express.Router();

// import the functions:

//? Assign Router to Controllers

notificationsRouter.get("/", fetchTokens);

notificationsRouter.get("/", (req, res) => {
  res.send("Push Notification Server Running");
});

notificationsRouter.post("/token", (req, res) => {
  saveToken(req.body.token);
  console.log(`Received push token, ${req.body.token.value.data}`);
  res.send(`Received push token, ${req.body.token.value.data}`);
});

notificationsRouter.post("/message", (req, res) => {
  handlePushTokens(req.body);
  console.log("handlePushTokens>>", handlePushTokens);
  console.log(`Received message, with title: ${req.body.title}`);
  res.send(`Received message, with title: ${req.body.title}`);
});

module.exports = notificationsRouter;
