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
  //! Added Phone Number because front end has it - Alqallaf
  phone: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  isMentor: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);
