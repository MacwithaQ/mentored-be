const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const Notification = require("../../database/models/Notification");

let savedPushTokens = [];

//? FETCH-ALL-TOKENS:
exports.fetchTokens = async (req, res, next) => {
  try {
    const tokens = await Notification.find();
    return res.json(tokens);
  } catch (error) {
    next(error);
  }
};

//? HANDLE PUSH TOKENS:
exports.handlePushTokens = ({ title, body }) => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      console.log("pushToken>>", pushToken);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      data: { body },
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};
//! HERE TOKEN UNDIFEND>>
//? SAVE TOKEN:
exports.saveToken = (token, next) => {
  try {
    console.log("token in try>>", token);
    console.log("savedPushToken in try>>", savedPushTokens);
    const exists = savedPushTokens.find((t) => t === token);
    if (!exists) {
      savedPushTokens.push(token);
      console.log("exists", exists); // indeifrnd
    }
  } catch (error) {
    next(error);
  }
};
