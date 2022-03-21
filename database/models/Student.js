const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const StudentSchema = new mongoose.Schema({
  educationLevel: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  guardian: {
    type: String,
  },
  //! added by AlKhareji
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
