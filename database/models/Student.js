const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  educationLevel: {
    type: String,
    // required: true,
  },
  age: {
    type: Number,
  },
  phone: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  guardian: {
    type: String,
  },
  gPhone: {
    type: Number,
  },
  image: {
    type: String,
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Student", StudentSchema);
