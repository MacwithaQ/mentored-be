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

  guardian: {
    type: String,
  },

  gPhone: {
    type: Number,
  },

  balance: {
    type: Number,
    default: 0,
    min: 0,
  },

  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

module.exports = mongoose.model("Student", StudentSchema);
