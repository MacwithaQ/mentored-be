const express = require("express");
const {
  fetchAppointment,
  addAppointment,
  bookAppointment,
} = require("./appointmentController");
const passport = require("passport");

const appointmentRouter = express.Router();

appointmentRouter.get("/", fetchAppointment);
appointmentRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addAppointment
);
appointmentRouter.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  bookAppointment
);

module.exports = appointmentRouter;
