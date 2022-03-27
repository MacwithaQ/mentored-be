const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  isMentor: { type: Boolean, required: true },

  phone: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },

  mentorProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  studentProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

module.exports = mongoose.model("User", UserSchema);
