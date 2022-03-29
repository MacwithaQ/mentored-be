const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const ConversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
