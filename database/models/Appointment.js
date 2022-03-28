const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const AppointmentSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  date: {
    type: Date,
    default: new Date(),
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
