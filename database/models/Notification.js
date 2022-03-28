const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const NotificationSchema = new mongoose.Schema({
  token: {
    type: String,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
