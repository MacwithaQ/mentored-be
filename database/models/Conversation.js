const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
