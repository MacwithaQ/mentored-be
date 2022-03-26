const { Expo } = require("expo-server-sdk");
const expo = new Expo();

let savedPushTokens = [];

//? HANDLE PUSH TOKENS:
exports.handlePushTokens = ({ title, body }) => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
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
  console.log("token", token); //undifend
  console.log("savedPushTokens", savedPushTokens); // []
  try {
    console.log(token, savedPushTokens);
    const exists = savedPushTokens.find((t) => t === token);
    if (!exists) {
      savedPushTokens.push(token);
      console.log("exists", exists); // indeifrnd
    }
  } catch (error) {
    next(error);
  }
};
