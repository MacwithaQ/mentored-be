const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const MajorSchema = new mongoose.Schema({
  name: {
    type: String,
    required,
  },
  mentor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }],
});

module.exports = mongoose.model("Major", MajorSchema);
