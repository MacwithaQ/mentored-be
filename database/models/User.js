const mongoose = require("mongoose");
// Creates a mongoose schema to define how a certain object is to be added to the database
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
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
});

module.exports = mongoose.model("User", UserSchema);
