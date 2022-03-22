const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const MentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  phone: {
    type: String,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

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

  image: {
    type: String,
  },

  //todo: Icebox - AlKhareji
  // degreeImage: {
  //   type: String,
  // },

  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],

  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Mentor", MentorSchema);
