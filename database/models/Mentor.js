const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const MentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  employer: {
    type: String,
    // required: true,
  },

  major: { type: String },

  bio: { type: String },

  //Todo: get majors from the DB - AlKhareji
  // major: { type: mongoose.Schema.Types.ObjectId, ref: "Major" },

  educationLevel: {
    type: String,
    // required: true,
  },

  //todo: Icebox - AlKhareji
  // degreeImage: {
  //   type: String,
  // },

  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

module.exports = mongoose.model("Mentor", MentorSchema);
