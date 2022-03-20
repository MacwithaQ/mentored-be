const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const MessageSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  messages: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Message", MessageSchema);
